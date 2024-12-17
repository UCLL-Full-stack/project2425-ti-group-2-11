import { useTranslation } from "next-i18next";
import { useState } from "react";

interface addProduct {
    name: string;
    description: string;
    stock: number;
    media: string;
    price: number;
    details: string;
}

const addProduct: React.FC = () => {
    const { t } = useTranslation();
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const [formData, setFormData] = useState<addProduct>({
        name: "",
        description: "",
        media: "",
        stock: 0,
        price: 0,
        details: ""
    });

    const setError = async (message: string) => {
        setErrorMessage(message);

        setTimeout(() => {
            setErrorMessage(null);
        }, 5000);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

    }

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;
        console.log(name, value, type);
        console.log(value);
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    return (
        <>
            <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="bg-white w-full max-w-md space-y-8 p-6 rounded-lg shadow-lg sm:p-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            {t("product.add")}
                        </h2>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="productName" className="sr-only">
                                    {t("product.name")}
                                </label>
                                <input
                                    id="productName"
                                    name="productName"
                                    type="text"
                                    onChange={handleChange}
                                    required
                                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder={t("product.name")}
                                />
                            </div>
                            <div>
                                <label htmlFor="description" className="sr-only">
                                    {t("product.description")}
                                </label>
                                <input
                                    id="description"
                                    name="description"
                                    type="text"
                                    onChange={handleChange}
                                    required
                                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder={t("product.description")}
                                />
                            </div>
                            <div>
                                <label htmlFor="media" className="sr-only">
                                    {t("product.media")}
                                </label>
                                <input
                                    id="media"
                                    name="media"
                                    type="url"
                                    onChange={handleChange}
                                    required
                                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder={t("product.media")}
                                />
                            </div>
                            <div>
                                <label htmlFor="stock" className="sr-only">
                                    {t("product.stock")}
                                </label>
                                <input
                                    id="stock"
                                    name="stock"
                                    type="number"
                                    onChange={handleChange}
                                    required
                                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder={t("product.stock")}
                                />
                            </div>
                            <div>
                                <label htmlFor="price" className="sr-only">
                                    {t("product.price")}
                                </label>
                                <input
                                    id="price"
                                    name="price"
                                    type="number"
                                    onChange={handleChange}
                                    required
                                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder={t("product.price")}
                                />
                            </div>
                            <div>
                                <label htmlFor="details" className="sr-only">
                                    {t("product.details")}
                                </label>
                                <input
                                    id="details"
                                    name="details"
                                    type="text"
                                    onChange={handleChange}
                                    required
                                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder={t("product.details")}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                {t("product.add")}
                            </button>
                        </div>
                    </form>
                    {errorMessage && (
                        <div className="m-1 p-1 bg-red-300 text-red-700">{errorMessage}</div>
                    )}
                    <footer className="text-gray-500 w-full text-center mt-4">{t("product.disclaimer")}</footer>
                </div>
            </div>
        </>
    )
}

export default addProduct
