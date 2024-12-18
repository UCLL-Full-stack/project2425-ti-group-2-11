import { jwtDecode } from "jwt-decode";
import { Plus, ShoppingCart } from "lucide-react";
import Image from "next/image";

interface ProductCardProps {
  name: string;
  price: number;
  media: string;
  productId: number;
}

export function ProductCard({
  name,
  price,
  media,
  productId,
}: ProductCardProps) {
  const addToCart = async (productId: number) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken: any = jwtDecode(token);
        const userId = decodedToken.userId;

        const res = await fetch(`http://localhost:3000/cart/add/${userId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          method: "POST",
          body: JSON.stringify({ productId }),
        });
        return;
      } else {
        throw new Error("Token is null");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };
  return (
    <div className="w-full max-w-xs mx-auto overflow-hidden rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
      <div className="relative w-full aspect-square md:h-48 md:w-56">
        <Image
          src={media}
          alt={name}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
          unoptimized
        />
      </div>
      <div className="p-4">
        <h3 className="text-sm font-semibold mb-2 h-12 md:h-14 line-clamp-2 md:line-clamp-3">
          {name}
        </h3>
        <div className="flex justify-between">
          <p className="text-lg font-bold text-blue-600">€{price.toFixed(2)}</p>
          <button
            onClick={() => addToCart(productId)}
            className="bg-blue-700 hover:bg-blue-800 text-white font-medium text-sm sm:text-base py-2 px-3 sm:px-4 rounded-md shadow-sm transition duration-300 ease-in-out transform hover:scale-102 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center space-x-1 sm:space-x-2 w-auto"
          >
            <Plus size={16} className="sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
