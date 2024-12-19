import { CartItem, ShoppingCart } from '@prisma/client';
import cartDB from '../repository/cart.db';
import { productDb } from '../repository/product.db';
import cartDb from '../repository/cart.db';

interface ShoppingCartService extends ShoppingCart {
    items: CartItem[];
}

const getCartItems = async (userId: number) => {
    const cartItems = await cartDB.getCartItems(userId);
    return cartItems;
};

const addToCart = async (userId: number, productId: number, quantity: number) => {
    const cart = await cartDB.addToCart(userId, productId, quantity);
    return cart;
};

const removeFromCart = async (userId: number, productId: number) => {
    return await cartDB.removeFromCart(userId, productId);
};

const updateCart = async (userId: number, productId: number, quantity: number, itemId: number) => {
    return await cartDB.updateCart(userId, itemId, productId, quantity);
};

const checkout = async (userId: number, cart: ShoppingCartService) => {
    const newOrder = await cartDB.createOrder({
        userId: userId,
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    for (const item of cart.items) {
        console.log(item, item.productId, item.quantity);
        await productDb.updateProductStock(item.productId, item.quantity);
        await cartDB.addItemToOrder(newOrder.id, item.productId, item.quantity, cart.id);
        await cartDB.removeFromCart(userId, item.id);
    }
    return true;
};

export default { addToCart, removeFromCart, getCartItems, updateCart, checkout };
