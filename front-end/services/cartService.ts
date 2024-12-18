import { jwtDecode } from "jwt-decode";
import router from "next/router";
import { useState } from "react";
const [token, settoken] = useState<string>();

const getTokenSetToken = () => {
  settoken(localStorage.getItem("token") ?? undefined);
  return token;
};
const getDecodedToken = () => {
  if (token) {
    return jwtDecode(token);
  }
  throw new Error("Token is undefined");
};

export const fetchShoppingCart = async (userId: number) => {
  getTokenSetToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}cart/items/${userId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    console.log("Response:", data);

    if (!res.ok && res.status === 400) {
      localStorage.removeItem("token");
      router.push("/login");
    }

    return data;
  } catch (error) {}
};

export const updateCartQuantityInDatabase = async (
  itemId: string,
  productId: number,
  newQuantity: number,
  userId: number
) => {
  getTokenSetToken();
  return await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}cart/update/${userId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "PUT",
      body: JSON.stringify({ itemId, productId, quantity: newQuantity }),
    }
  );
};
