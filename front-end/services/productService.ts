export const getProductById = async (productId: number) => {
    const token = localStorage.getItem("token");
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}products/${productId}`,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            method: "GET",
        }
    );
    if (!res.ok) {
        throw new Error("Failed to fetch product");
    }
    console.log('product', res)
    return res.json();
};