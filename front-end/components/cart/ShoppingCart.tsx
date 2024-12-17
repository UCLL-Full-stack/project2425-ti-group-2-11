"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Trash } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface ShoppingCart {
  id: string;
  items: CartItem[];
  total: number;
}

function useShoppingCart(cartId: string) {
  const [cart, setCart] = useState<ShoppingCart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCart() {
      try {
        const mockCart: ShoppingCart = {
          id: cartId,
          items: [
            {
              id: "1",
              name: "Product 1",
              price: 19.99,
              quantity: 2,
              image: "/placeholder.svg?height=100&width=100",
            },
            {
              id: "2",
              name: "Product 2",
              price: 29.99,
              quantity: 1,
              image: "/placeholder.svg?height=100&width=100",
            },
            {
              id: "3",
              name: "Product 3",
              price: 39.99,
              quantity: 3,
              image: "/placeholder.svg?height=100&width=100",
            },
          ],
          total: 189.94,
        };

        setCart(mockCart);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch cart data");
        setLoading(false);
      }
    }

    fetchCart();
  }, [cartId]);

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (cart) {
      const updatedItems = cart.items.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );
      const newTotal = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      setCart({
        ...cart,
        items: updatedItems,
        total: Number(newTotal.toFixed(2)),
      });
    }
  };

  const removeItem = (itemId: string) => {
    if (cart) {
      const updatedItems = cart.items.filter((item) => item.id !== itemId);
      const newTotal = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      setCart({
        ...cart,
        items: updatedItems,
        total: Number(newTotal.toFixed(2)),
      });
    }
  };

  return { cart, loading, error, updateQuantity, removeItem };
}

interface ShoppingCartProps {
  shoppingCartId: string;
}

export default function ShoppingCart({ shoppingCartId }: ShoppingCartProps) {
  const { cart, loading, error, updateQuantity, removeItem } =
    useShoppingCart(shoppingCartId);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!cart) {
    return <div>No cart found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="w-full max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-4 sm:px-6 py-4 bg-gray-100 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Shopping Cart</h2>
        </div>
        {cart.items.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-lg text-gray-500">Your cart is empty</p>
          </div>
        ) : (
          <div className="p-4 sm:p-6">
            {cart.items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 py-4 border-b last:border-b-0"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={50}
                  height={50}
                  className="rounded-md"
                />
                <div className="flex-grow">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-500">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center space-x-2 w-full sm:w-auto justify-between sm:justify-start">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.id, parseInt(e.target.value))
                    }
                    className="w-16 px-2 py-1 text-center border rounded"
                  />
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-sm text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                  >
                    <Trash size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="px-4 sm:px-6 py-4 bg-gray-100 border-t flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
          <div className="text-lg font-semibold">
            Total: ${cart.total.toFixed(2)}
          </div>
          <button className="w-full sm:w-auto px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

