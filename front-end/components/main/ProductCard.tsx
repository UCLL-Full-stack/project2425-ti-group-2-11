
interface ProductCardProps {
  name: string
  price: number
  media: string
}

export function ProductCard({ name, price, media }: ProductCardProps) {
  return (
    <div className=" w-full overflow-hidden rounded-lg bg-white shadow-md">
      <div className="p-2">
        <img src={media} alt={name} width={96} height={96} className="rounded-md" />
        <h3 className="mt-2 text-sm font-semibold">{name}</h3>
        <p className="text-xs text-gray-600">${price.toFixed(2)}</p>
      </div>
    </div>
  )
}

