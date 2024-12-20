import { productDb } from '../repository/product.db';

const getAllProducts = async () => {
    const products = await productDb.getAllProducts();
    return products;
};

const getProductsLimitDesc = async (limit: number) => {
    const products = await productDb.getProductsLimitDesc(limit);
    return products;
};

const getProductById = async (productId: number) => {
    const product = await productDb.getProductById(productId);
    return product;
};

export default { getAllProducts , getProductsLimitDesc, getProductById };