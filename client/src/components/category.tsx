import Image from 'next/image'

interface CategoryProps {
  category: string
  image: string
}

const Category = ({ category, image }: CategoryProps) => {
  return (
    <div className="w-16 h-38 md:w-20 md:h-42 lg:w-26 lg:h-48 flex flex-col justify-center items-center gap-4">
      <div className="flex justify-center items-center w-16 h-16 md:w-20 md:h-20 lg:w-26 lg:h-26 rounded-full border-[1px] shadow-sm">
        <div className="relative w-16 h-16 md:w-20 md:h-20 lg:w-26 lg:h-26 aspect-square overflow-hidden">
          <Image
            src={image}
            alt="Meat"
            fill={true}
            className="rounded-full object-cover opacity-70 hover:opacity-100 transition-opacity duration-300"
            quality={70}
          />
        </div>
      </div>

      <p className="font-semibold text-xs md:text-base lg:text-lg text-center h-9">{category}</p>
    </div>
  )
}

export default Category
