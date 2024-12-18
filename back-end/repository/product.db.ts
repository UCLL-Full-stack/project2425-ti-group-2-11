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

const getProductById = async (productId: number): Promise<Product> => {
    try {
        const productPrisma = await database.product.findUnique({
            where: {
                id: productId,
            },
        });
        if (!productPrisma) {
            throw new Error('Product not found');
        }
        return Product.from(productPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};
const productDb = {
    getAllProducts,
    getProductsLimitDesc,
    getProductById,
};

export { productDb };
