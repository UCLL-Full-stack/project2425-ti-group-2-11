import cartDB from "../repository/cart.db"

const getCartItems = async (userId: number) => {
    const cart = await cartDB.getCartItems(userId);
    return cart;
};

export default { getCartItems };