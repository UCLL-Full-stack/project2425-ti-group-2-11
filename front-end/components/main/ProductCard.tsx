interface ProductCardProps {
  name: string;
  price: number;
  media: string;
}

export function ProductCard({ name, price, media }: ProductCardProps) {
  return (
    <div className=" w-full overflow-hidden rounded-lg bg-white shadow-md hover:cursor-pointer">
      <div className="p-2">
        <img
          src={media}
          alt={name}
          className="rounded-md"
        />
        <div className="mt-2 text-sm font-semibold h-16 flex items-start">
          <p className="line-height-3">{name}</p>
        </div>
        <p className="text-xs text-gray-600">${price.toFixed(2)}</p>
      </div>
    </div>
  );
}
