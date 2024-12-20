import { Product } from "@/types/cartTypes"
import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import { getProductById as fetchProduct } from "../../services/productService";
import Navbar from "@/components/header/navbar";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const ProductById = () => {
    const [product, setProduct] = useState<Product | null>(null);

    const router = useRouter();

    const { t } = useTranslation()

    const { productId } = router.query;

    const getProductById = async () => {
        const productResponse = await fetchProduct(
            Number(productId)
        );
        const product = productResponse;
        setProduct(product);
    }

    useEffect(() => {
        if (productId) getProductById();
    }, [productId]);

    return (
        <>
            <Navbar />
            {product ? (
            <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold text-center bg-blue-500 text-white p-5 mb-5 rounded-lg shadow-lg">{product.name}</h1>
            <div className="flex justify-center mb-5">
            <img src={product.media} alt={product.name} className="max-h-96 max-w-full rounded-lg shadow-lg" />
            </div>
            <div className="flex flex-col md:flex-row justify-center gap-5 mt-5 text-xl">
            <p className="pr-5 font-bold text-gray-700">{t('product.price')}: <span className="text-green-500">${product.price}</span></p>
            <p className="font-bold text-gray-700">{t('product.stock')}: <span className="text-red-500">{product.stock}</span></p>
            </div>
            {product.stock < 20 && (
            <p className="text-center text-xl text-red-500">{t('product.hurry')}</p>
            )}
            <p className="font-bold text-xl mt-5 text-gray-700">{t('product.details')}: <span className="text-gray-600">{product.details}</span></p>
            </div>
            ) : (
            <p className="text-center text-xl text-gray-500">Loading...</p>
            )}
        </>
    )
}

export const getServerSideProps = async (context: { locale: any; }) => {
    const { locale } = context;
    return {
        props: {
            ...(await serverSideTranslations(locale ?? "en", [`common`])),
        },
    };
}

export default ProductById;