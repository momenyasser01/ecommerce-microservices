'use client'

import Navbar from '@/components/navbar'
import Products from '@/components/products'

export default function Home() {
  return (
    <div className="w-screen h-screen flex flex-col items-center gap-12 overflow-y-auto bg-[#F5F5F5]">
      <div className="w-full fixed top-0 left-0 z-10">
        <Navbar />
      </div>
      <div className='pt-28'>
        <Products />
      </div>
    </div>
  )
}
