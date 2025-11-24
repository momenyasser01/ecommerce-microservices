import Categories from '@/components/categories'
import Products from '@/components/products'

export default function Home() {
  return (
    <div className="w-full flex flex-col flex-grow justify-start items-center gap-20 bg-[#F5F5F5] pt-16">
      <Categories />
      <Products />
    </div>
  )
}
