'use client'

import CartItem from '@/components/cart-item'
import { useCart } from '@/context/cart-context'
import { useRouter } from 'next/navigation'

const Cart = () => {
  const { cart, addItem, decreaseQuantity, removeItem, total } = useCart()
  const router = useRouter()

  const itemsCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="w-full flex flex-col justify-start items-center py-8">
      <h1 className="text-2xl border-b-4 border-[#00B106] font-bold">Shopping Cart</h1>
      <div className="w-[90%] lg:w-[50%] flex flex-col justify-center items-center gap-7">
        <div className="w-full">
          {cart.map((cartItem, index) => (
            <CartItem
              key={index}
              cartItem={cartItem}
              addItem={addItem}
              decreaseQuantity={decreaseQuantity}
              removeItem={removeItem}
            />
          ))}
        </div>
        <div className="w-full flex flex-row justify-end items-center gap-3.5">
          <p>{`Total (${itemsCount} items):`}</p>
          <p className="text-xl text-[#00B106] font-semibold">{`${total.toFixed(2)} EGP`}</p>
        </div>
        <button
          onClick={() => router.push('/checkout')}
          className="w-full h-10 flex justify-center items-center rounded-sm text-white font-semibold bg-[#00B106] hover:bg-[#00990A] transition-all ease-in-out duration-200"
        >
          Checkout
        </button>
      </div>
    </div>
  )
}

export default Cart
