'use client'

import CartItem from '@/components/cart-item'
import { useCart } from '@/context/cart-context'
import { ShoppingBasketIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

const Cart = () => {
  const { cart, addItem, decreaseQuantity, removeItem, total } = useCart()
  const router = useRouter()

  const itemsCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  if (cart.length === 0)
    return (
      <div className="w-full h-full flex flex-grow flex-col justify-center items-center gap-6">
        <ShoppingBasketIcon className="size-20" />
        <div className="flex flex-col justify-center items-center gap-1">
          <p className="text-2xl font-semibold">Your cart is empty</p>
          <p className="text-lg text-gray-600">Ready to order?</p>
        </div>
        <button
          onClick={() => router.replace('/')}
          className="w-26 h-9 bg-green-600/95 hover:bg-[#00990A] rounded-full text-white font-medium transition-all ease-in-out duration-200"
        >
          Shop now
        </button>
      </div>
    )

  return (
    <div className="w-full flex xl:flex-row flex-col justify-center xl:items-start items-center py-8 gap-19">
      <div className="w-[94%] xl:w-[677px] flex flex-col gap-6 px-4 py-5 border-[1.5px] border-gray-200 rounded-2xl">
        {cart.map((cartItem, index) => (
          <div className="w-full flex flex-col gap-6" key={index}>
            <CartItem
              key={index}
              cartItem={cartItem}
              addItem={addItem}
              decreaseQuantity={decreaseQuantity}
              removeItem={removeItem}
            />
            {index < cart.length - 1 && <hr />}
          </div>
        ))}
      </div>

      <div className="w-[94%] xl:w-[419.5px] flex flex-col justify-center items-start gap-3.5">
        <h1 className="text-[22px] font-semibold">Order Details</h1>
        <div className="w-full flex flex-col justify-center items-start gap-6.5">
          <div className="w-full flex flex-col justify-start items-start rounded-xl px-4.5 py-5 gap-4 bg-gray-50">
            <p className="text-lg font-semibold">{`${itemsCount} items`}</p>
            <div className="w-full flex flex-col justify-center items-center gap-2.5">
              {cart.map((cartItem, index) => (
                <div key={index} className="w-full flex justify-between items-center">
                  <p className="w-[65%] text-sm text-gray-600/90">{`${cartItem.quantity} x ${cartItem.name}`}</p>
                  <p className="text-sm font-semibold">
                    {(cartItem.quantity * cartItem.price).toFixed(2)} EGP
                  </p>
                </div>
              ))}
            </div>
            <hr className="w-full mt-2" />
            <div className="w-full flex justify-between items-center mt-1.5">
              <p className="text-[17px] font-semibold">Subtotal</p>
              <p className="text-[17px] font-semibold">{total.toFixed(2)} EGP</p>
            </div>
          </div>

          <button
            onClick={() => router.push('/checkout')}
            className="w-full h-12.5 flex justify-center items-center rounded-sm text-white font-medium bg-green-600/95 hover:bg-[#00990A] transition-all ease-in-out duration-200"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart
