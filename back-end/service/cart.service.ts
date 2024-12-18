import cartDB from '../repository/cart.db';

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

export default { addToCart, removeFromCart, getCartItems, updateCart };
