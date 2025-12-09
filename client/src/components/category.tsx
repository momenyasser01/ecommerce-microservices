'use client'

import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'

interface CategoryProps {
  category: string
  image: string
  priority: boolean
}

const Category = ({ category, image, priority }: CategoryProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const categoryParam = searchParams.get('category')

  function handleOnClick() {
    router.push(`?category=${category}`)
  }

  return (
    <div
      onClick={handleOnClick}
      className="w-16 h-38 md:w-20 md:h-42 lg:w-26 lg:h-48 flex flex-col justify-center items-center gap-4"
    >
      <div className="flex justify-center items-center w-16 h-16 md:w-20 md:h-20 lg:w-26 lg:h-26 rounded-full border-[1px] shadow-sm">
        <Image
          src={image}
          alt="Meat"
          width={160}
          height={160}
          sizes="
                (max-width: 640px) 90px,
                (max-width: 768px) 110px,
                (max-width: 1024px) 130px,
                130px
                "
          priority={priority}
          fetchPriority={priority ? 'high' : undefined}
          className={`w-16 h-16 md:w-20 md:h-20 lg:w-26 lg:h-26 aspect-square cursor-pointer overflow-hidden rounded-full object-cover ${
            category === categoryParam ? 'opacity-100' : 'opacity-70'
          } hover:opacity-100 transition-opacity duration-300`}
          quality={30}
        />
      </div>

      <p className="font-medium text-xs md:text-base lg:text-lg text-center h-9">{category}</p>
    </div>
  )
}

export default Category
