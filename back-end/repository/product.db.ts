import { Product } from '../model/product';
import database from './database';

const getAllProducts = async (): Promise<Product[]> => {
    try {
        const productsPrisma = await database.product.findMany();
        return productsPrisma.map((productPrisma) => Product.from(productPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getProductsLimitDesc = async (limit: number): Promise<Product[]> => {
    try {
        const productsPrisma = await database.product.findMany({
            take: limit,
            orderBy: {
                id: 'desc',
            },
        });
        return productsPrisma.map((productPrisma) => Product.from(productPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const productDb = {
    getAllProducts,
    getProductsLimitDesc,
};

export { productDb };
