import { ShoppingCart } from '@prisma/client';
import database from './database';
import { productDb } from './product.db';

const createShoppingCart = async (userId: number): Promise<ShoppingCart> => {
    try {
        const cart = await database.shoppingCart.create({
            data: {
                userId: userId,
            },
        });
        return cart;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getCartItems = async (userId: number): Promise<ShoppingCart> => {
    try {
        const cart = await database.shoppingCart.findFirst({
            where: {
                userId: userId,
            },
            include: {
                products: true,
            },
        });
        if (!cart) {
            throw new Error('Cart not found');
        }
        return cart;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const addToCart = async (userId: number, productId: number): Promise<ShoppingCart> => {
    try {
        const cart = await database.shoppingCart.findFirst({
            where: {
                userId: userId,
            },
            include: {
                products: true,
            },
        });

        if (!cart) {
            throw new Error('Cart not found');
        }

        const product = await productDb.getProductById(productId);
        if (!product) {
            throw new Error('Product not found');
        }

        const updatedProducts = [...cart.products, product];

        const updatedCart = await database.shoppingCart.update({
            where: {
                id: cart.id,
            },
            data: {
                products: {
                    set: updatedProducts.map((p) => ({ id: (p as any).id })),
                },
            },
            include: {
                products: true,
            },
        });

        return updatedCart;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const removeFromCart = async (userId: number, productId: number): Promise<ShoppingCart> => {
    try {
        const cart = await database.shoppingCart.findFirst({
            where: {
                userId: userId,
            },
            include: {
                products: true,
            },
        });

        if (!cart) {
            throw new Error('Cart not found');
        }

        const updatedProducts = cart.products.filter((product) => product.id !== productId);

        const updatedCart = await database.shoppingCart.update({
            where: {
                id: cart.id,
            },
            data: {
                products: {
                    set: updatedProducts.map((p) => ({ id: (p as any).id })),
                },
            },
            include: {
                products: true,
            },
        });

        return updatedCart;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {createShoppingCart, getCartItems, addToCart, removeFromCart };
