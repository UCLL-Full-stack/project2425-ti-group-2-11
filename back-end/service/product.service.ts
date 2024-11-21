import { productDb } from '../repository/product.db';

const getAllProducts = async () => {
    const products = await productDb.getAllProducts();
    return products;
};

const getProductsLimitDesc = async (limit: number) => {
    const products = await productDb.getProductsLimitDesc(limit);
    return products;
};

export default { getAllProducts , getProductsLimitDesc };