import Image from 'next/image'

interface CategoryProps {
  category: string
  image: string
}

const Category = ({ category, image }: CategoryProps) => {
  return (
    <div className="w-26 h-48 flex flex-col justify-center items-center gap-4">
      <div className="flex justify-center items-center w-26 h-26 rounded-full border-[1px] shadow-sm">
        <button className="relative w-26 h-26 aspect-square overflow-hidden">
          <Image
            src={image}
            alt="Meat"
            fill={true}
            className="rounded-full object-cover opacity-70 hover:opacity-100 transition-opacity duration-300"
            unoptimized
          />
        </button>
      </div>

      <p className="font-semibold text-lg text-center h-8">{category}</p>
    </div>
  )
}

export default Category
