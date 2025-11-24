import { MinusIcon, PlusIcon, Trash2Icon } from 'lucide-react'
import Image from 'next/image'

interface CartItem {
  id: string
  name: string
  description: string
  price: number
  weight: number
  measurement: string
  category: string
  image: string
  quantity: number
  stock: number
}

interface CartItemProps {
  cartItem: CartItem
  addItem: (item: CartItem) => void
  decreaseQuantity: (id: string) => void
  removeItem: (id: string) => void
}

const CartItem = ({ cartItem, addItem, decreaseQuantity, removeItem }: CartItemProps) => {
  return (
    <div className="relative w-full flex sm:flex-row flex-col sm:justify-between justify-start items-center px-8 py-8 sm:gap-0 gap-4 border-b border-gray-300">
      <div className="sm:w-1/2 w-full flex flex-row justify-center items-center gap-4">
        <Image src={cartItem.image} alt="Product image" width={96} height={96} quality={70} />
        <div className="w-full flex flex-col justify-start items-start gap-2">
          <p className="w-full sm:text-lg text-sm font-semibold">{cartItem.name}</p>
          <p className="text-[13px] text-gray-600">
            {cartItem.measurement === 'G'
              ? cartItem.weight * cartItem.quantity >= 1000
                ? `${(cartItem.weight * cartItem.quantity) / 1000} kg`
                : `${cartItem.weight * cartItem.quantity} g`
              : cartItem.measurement === 'ML'
              ? cartItem.weight * cartItem.quantity >= 1000
                ? `${(cartItem.weight * cartItem.quantity) / 1000} l`
                : `${cartItem.weight * cartItem.quantity} ml`
              : `${cartItem.weight * cartItem.quantity} pcs`}
          </p>
          <div className="w-full flex flex-row justify-start items-center gap-4">
            <p className="text-[13px] text-gray-600">Quantity: {cartItem.quantity}</p>
            <div className="flex flex-row justify-center items-start gap-1.5">
              <button
                onClick={() => addItem({ ...cartItem, quantity: 1 })}
                className="size-5 flex justify-center items-center rounded border border-gray-300 hover:bg-[#00B106] hover:text-white text-gray-600 transition-all ease-in-out duration-250"
              >
                {''}
                <PlusIcon className="size-3.5 stroke-3" />
              </button>
              <button
                onClick={() => decreaseQuantity(cartItem.id)}
                className="size-5 flex justify-center items-center rounded border border-gray-300 hover:bg-red-500 hover:text-white text-gray-600 transition-all ease-in-out duration-250"
              >
                <MinusIcon className="size-3.5 stroke-3" />
                {''}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="sm:w-1/2 w-full flex flex-row sm:justify-end justify-between items-center sm:gap-4 gap-2">
        <p className="flex text-end sm:text-lg text-sm font-semibold">
          {(cartItem.price * cartItem.quantity).toFixed(2)} EGP
        </p>
        <button
          onClick={() => removeItem(cartItem.id)}
          className="size-10 flex justify-center items-center rounded text-gray-600 border border-gray-300 hover:text-white hover:bg-red-500 transition-all ease-in-out duration-200"
        >
          {''}
          <Trash2Icon className="size-5" />
        </button>
      </div>
    </div>
  )
}

export default CartItem
