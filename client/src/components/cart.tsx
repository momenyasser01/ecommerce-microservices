'use client'

import { useCart } from '@/context/cart-context'
import { ShoppingCartIcon } from 'lucide-react'
import Link from 'next/link'

const Cart = () => {
  const { cart } = useCart()

  const itemsCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <Link href={'/cart'} className="relative text-black">
      {itemsCount > 0 && (
        <div className="absolute left-4 bottom-3 flex justify-center items-center size-5 rounded-full text-[12.5px] font-semibold text-white bg-[#00B106]">
          {itemsCount}
        </div>
      )}
      <ShoppingCartIcon />
    </Link>
  )
}

export default Cart
