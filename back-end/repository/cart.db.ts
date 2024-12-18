import { ShoppingCart, CartItem } from '@prisma/client';
import database from './database';
import { productDb } from './product.db';

const addToCart = async (
    userId: number,
    productId: number,
    quantity: number
): Promise<ShoppingCart> => {
    try {
        const cart = await database.shoppingCart.findFirst({
            where: { userId },
            include: { items: { include: { product: true } } },
        });

        if (!cart) {
            throw new Error('Cart not found');
        }

        const product = await productDb.getProductById(productId);
        if (!product) {
            throw new Error('Product not found');
        }

        const existingItem = cart.items.find((item) => item.productId === productId);
        if (existingItem) {
            await database.cartItem.update({
                where: { id: existingItem.id },
                data: { quantity: existingItem.quantity + quantity },
            });
        } else {
            await database.cartItem.create({
                data: {
                    quantity,
                    productId,
                    shoppingCartId: cart.id,
                },
            });
        }

        const updatedCart = await database.shoppingCart.findFirst({
            where: { id: cart.id },
            include: { items: { include: { product: true } } },
        });

        if (!updatedCart) {
            throw new Error('Failed to update cart');
        }
        return updatedCart;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const removeFromCart = async (userId: number, itemId: number): Promise<ShoppingCart> => {
    try {
        const cart = await database.shoppingCart.findFirst({
            where: { userId },
            include: { items: { include: { product: true } } },
        });

        if (!cart) {
            throw new Error('Cart not found');
        }

        const existingItem = cart.items.find((item) => item.id === itemId);
        if (!existingItem) {
            throw new Error('Item not found in cart');
        }

        console.log(`Removing item ${itemId} from cart for user ${userId}`);
        await database.cartItem.delete({
            where: { id: existingItem.id },
        });

        const updatedCart = await database.shoppingCart.findFirst({
            where: { id: cart.id },
            include: { items: { include: { product: true } } },
        });

        if (!updatedCart) {
            throw new Error('Failed to update cart');
        }

        console.log(`Cart updated for user ${userId}:`, updatedCart);

        return updatedCart;
    } catch (error) {
        console.error('Error in removeFromCart:', error);
        throw new Error('Database error. See server log for details.');
    }
};

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
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });
        if (!cart) {
            const cart = await createShoppingCart(userId);
            return cart;
        }
        return cart;
    } catch (error) {
        console.error(`Error in getCartItems for userId: ${userId}`, error);
        throw new Error('Database error. See server log for details.');
    }
};

const updateCart = async (
    userId: number,
    itemId: number,
    productId: number,
    quantity: number
): Promise<ShoppingCart> => {
    try {
        const cart = await database.shoppingCart.findFirst({
            where: { userId },
            include: { items: { include: { product: true } } },
        });

        if (!cart) {
            throw new Error('Cart not found');
        }

        console.log(`Cart found for user ${userId}:`, cart);
        console.log(`productId: ${cart.items[0].product.id}`);

        const existingItem = cart.items.find(
            (item) => item.id === itemId && item.productId === productId
        );
        if (!existingItem) {
            console.error(`Product with ID ${productId} not found in cart for user ${userId}`);
            console.log(
                `Available product IDs in cart: ${cart.items
                    .map((item) => item.productId)
                    .join(', ')}`
            );
            throw new Error('Product not found in cart');
        }

        console.log(`Updating quantity for product ${productId} to ${quantity}`);

        await database.cartItem.update({
            where: { id: existingItem.id },
            data: { quantity },
        });

        const updatedCart = await database.shoppingCart.findFirst({
            where: { id: cart.id },
            include: { items: { include: { product: true } } },
        });

        if (!updatedCart) {
            throw new Error('Failed to update cart');
        }

        console.log(`Cart updated for user ${userId}:`, updatedCart);

        return updatedCart;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default { addToCart, removeFromCart, getCartItems, createShoppingCart, updateCart };
