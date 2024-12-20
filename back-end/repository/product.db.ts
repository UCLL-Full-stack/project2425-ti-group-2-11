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

const updateProductStock = async (productId: number, amount: number): Promise<void> => {
    try {
        const existingProduct = await database.product.findUnique({
            where: {
                id: productId,
            },
        });

        if (!existingProduct) {
            throw new Error('Product not found');
        }

        const newAmount = existingProduct.stock - amount;

        await database.product.update({
            where: {
                id: productId,
            },
            data: {
                stock: newAmount,
            },
        });
    } catch (error) {}
};

const createProduct = async (product: any): Promise<Product> => {
    try {
        if (!(product instanceof Product)) {
            product = new Product(product);
        }

        const productPrisma = await database.product.create({
            data: {
                name: product.getName(),
                description: product.getDescription(),
                media: product.getMedia(),
                stock: Number(product.getStock()),
                price: Number(product.getPrice()),
                details: product.getDetails(),
            },
        });
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
    updateProductStock,
    createProduct,
};

export { productDb };
