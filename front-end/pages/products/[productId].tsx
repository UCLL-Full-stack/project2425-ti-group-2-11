import { Product } from "@/types/cartTypes"
import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import { getProductById as fetchProduct } from "../../services/productService";
import Navbar from "@/components/header/navbar";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const ProductById = () => {
    const [product, setProduct] = useState<Product | null>(null);

    const router = useRouter();

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
                <div className="text-center">
                    <h1 className="text-3xl bg-blue-500 p-5 mb-5">{product.name}</h1>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <img src={product.media} alt="" style={{ maxHeight: '500px', maxWidth: '500px' }} />
                    </div>
                    <div className="flex flex-row justify-center gap-5 mt-5 text-xl">
                        <p className="pr-5 font-bold">Price: ${product.price}</p>
                        <p className="font-bold">Stock: {product.stock}</p>
                    </div>
                    <p className="font-bold text-xl mt-5">Details: {product.details}</p>

                </div>
            ) : (
                <p>Loading...</p>
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