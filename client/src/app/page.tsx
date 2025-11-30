import Categories from '@/components/categories'
import Products from '@/components/products'

export default function Home() {
  return (
    <div className="w-full flex flex-col flex-grow justify-start items-center md:pt-16 pt-6 md:gap-20 gap-8 bg-[#F5F5F5]">
      <Categories />
      <Products />
    </div>
  )
}
