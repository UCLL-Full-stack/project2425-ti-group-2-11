import cartDB from "../repository/cart.db"

const getCartItems = async (cartId: number) => {
    const cart = await cartDB.getCartItems(cartId);
    return cart;
};

export default { getCartItems };