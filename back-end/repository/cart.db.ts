import { ShoppingCart } from '@prisma/client';
import database from './database';

const getCartItems = async (cartId: number): Promise<ShoppingCart> => {
    try {
        const cart = await database.shoppingCart.findFirst({
            where: {
                id: cartId,
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

export default { getCartItems };
