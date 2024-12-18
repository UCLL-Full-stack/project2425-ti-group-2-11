import cartDB from '../repository/cart.db';

const getCartItems = async (userId: number) => {
    try {
        const cart = await cartDB.getCartItems(userId);
        return cart;
    } catch (error: any) {
        cartDB.createShoppingCart(userId);
        const cart = await cartDB.getCartItems(userId);
        return cart;
    }
};

const addToCart = async (userId: number, productId: number) => {
    const cart = await cartDB.addToCart(userId, productId);
    return cart;
};

const removeFromCart = async (userId: number, productId: number) => {
    return await cartDB.removeFromCart(userId, productId);
};
export default { getCartItems, addToCart, removeFromCart };
