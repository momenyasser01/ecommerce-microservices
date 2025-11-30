'use client'

import { useCart } from '@/context/cart-context'
import { ShoppingCartIcon } from 'lucide-react'
import Link from 'next/link'

const Cart = () => {
  const { cart } = useCart()

  const itemsCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <Link href={'/cart'} className="flex justify-center items-center text-black">
      <div className="relative">
        <ShoppingCartIcon className='size-7'/>
        {itemsCount > 0 && (
          <div className="absolute left-4 bottom-3 flex justify-center items-center size-5.5 rounded-full text-xs font-semibold text-white bg-green-600/95">
            {itemsCount}
          </div>
        )}
      </div>
    </Link>
  )
}

export default Cart
