import { Product } from "@/types/cartTypes";
import { ProductCard } from "./ProductCard";
import { useRouter } from 'next/router';

interface AllProductsProps {
  items: Product[];
  onMessage: (text: string) => void;
}

export const AllProducts: React.FC<AllProductsProps> = ({ items, onMessage }) => {

  const router = useRouter();
  const handleClick = (id: number) => {
    router.push(`/products/${id}`);
  }

  return (
    <div className="flow-root">
      <div>
        <h2 className="text-2xl font-semibold mb-6">Alle Producten</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-4">
        {items.map((item, index) => (
          <button onClick={() => handleClick(item.id)}>
            <ProductCard
              key={index}
              name={item.name}
              price={item.price}
              media={item.media}
              productId={item.id}
              onMessage={onMessage}
            />
          </button>
        ))}
      </div>
    </div>
  );
};
