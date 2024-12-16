import Image from 'next/image'

interface CategoryCardProps {
  name: string
  image: string
}

export function CategoryCard({ name, image }: CategoryCardProps) {
  return (
    <div className="w-full max-w-[100px] flex-shrink-0 overflow-hidden rounded-lg bg-white shadow-md">
      <div className="p-2">
        <Image src={image} alt={name} width={96} height={96} className="rounded-md" />
        <h3 className="mt-2 text-center text-sm font-semibold">{name}</h3>
      </div>
    </div>
  )
}

