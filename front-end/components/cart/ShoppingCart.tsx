"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Trash } from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  stock: number;
  price: number;
  quantity: number;
  image: string;
}

interface ShoppingCart {
  id: string;
  items: CartItem[];
  total: number;
}

function useShoppingCart(userId: number) {
  const [cart, setCart] = useState<ShoppingCart | null>(null);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShoppingCart = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:3000/cart/items/${userId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        const total = data.products.reduce((sum: number, item: any) => {
          const price = Number(item.price);
          return sum + price;
        }, 0);
        console.log("Fetched data:", data); // Debugging line
        const cart: ShoppingCart = {
          id: data.id,
          items: data.products.map((item: any) => ({
            id: item.id,
            stock: item.stock,
            name: item.name,
            price: item.price,
            quantity: item.quantity || 1,
            image: item.media,
          })),
          total: total,
        };
        console.log("Constructed cart:", cart.total); // Debugging line
        setCart(cart);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch cart data: " + error);
        setLoading(false);
      }
    };

    fetchShoppingCart();
  }, [userId]);

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

  const removeFromDatabase = async (itemId: number) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const res = await fetch(`http://localhost:3000/cart/remove/${userId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          method: "DELETE",
          body: JSON.stringify({ productId: itemId }),
        });
        return;
      } else {
        throw new Error("Token is null");
      }
    } catch (error) {
      console.error("Error removing product from cart:", error);
    }
  };

  const removeItem = (itemId: string) => {
    if (cart) {
      const updatedItems = cart.items.filter((item) => item.id !== itemId);
      const newTotal = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      removeFromDatabase(Number(itemId));
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
  userId: number;
}

export default function ShoppingCart({ userId }: ShoppingCartProps) {
  const { cart, loading, error, updateQuantity, removeItem } =
    useShoppingCart(userId);

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
                    max={item.stock}
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
            Total: €{cart.total.toFixed(2)}
          </div>
          <button className="w-full sm:w-auto px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
