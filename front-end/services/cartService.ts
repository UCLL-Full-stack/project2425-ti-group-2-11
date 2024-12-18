import { jwtDecode } from "jwt-decode";
import router from "next/router";
import { useState } from "react";

export const fetchShoppingCart = async (userId: number, token: string) => {
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
  userId: number,
  token: string
) => {
  const res = await fetch(
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
  if (!res.ok) {
    throw new Error("Failed to update quantity in the database");
  }
  return res;
};

export const removeFromDatabaseService = async (
  itemId: number,
  userId: number,
  token: string
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}cart/remove/${userId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "DELETE",
      body: JSON.stringify({ productId: itemId }),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to remove item from the database");
  }
  return res;
};

export const checkoutService = async (
  userId: number,
  cart: any,
  token: string
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}cart/checkout/${userId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "DELETE",
      body: JSON.stringify({ cart: cart }),
    }
  );
  if (!res.ok) {
    throw new Error("Failed to checkout");
  }
  return res;
};
