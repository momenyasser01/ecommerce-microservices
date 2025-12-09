import { MinusIcon, PlusIcon, XIcon } from 'lucide-react'
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
  addItem?: (item: CartItem) => void
  decreaseQuantity?: (id: string) => void
  removeItem?: (id: string) => void
}

const CartItem = ({ cartItem, addItem, decreaseQuantity, removeItem }: CartItemProps) => {
  return (
    <div className="relative w-full flex flex-row justify-between items-center gap-2 xl:gap-0">
      <Image src={cartItem.image} alt="Product image" className='object-contain size-24' width={96} height={96} quality={70} />

      <div className="xl:w-[81.5%] w-full flex flex-row justify-center items-center gap-4">
        <div className="w-full flex flex-col justify-start items-start gap-2">
          <div className="w-full flex justify-between items-start">
            <p className="w-full sm:text-lg text-sm font-medium">{cartItem.name}</p>
            {removeItem && (
              <button
                onClick={() => removeItem(cartItem.id)}
                className="size-7 flex justify-center items-center rounded-full text-gray-500 hover:text-black/90 hover:bg-gray-200/50 transition-all ease-in-out duration-150"
              >
                <XIcon className="size-4" />
                {''}
              </button>
            )}
          </div>

          <p className="text-[14px] text-gray-600">
            {cartItem.measurement === 'G'
              ? cartItem.weight * cartItem.quantity >= 1000
                ? `${(cartItem.weight * cartItem.quantity) / 1000} KG`
                : `${cartItem.weight * cartItem.quantity} G`
              : cartItem.measurement === 'ML'
              ? cartItem.weight * cartItem.quantity >= 1000
                ? `${(cartItem.weight * cartItem.quantity) / 1000} L`
                : `${cartItem.weight * cartItem.quantity} ML`
              : `${cartItem.weight * cartItem.quantity} PCS`}
          </p>
          <div className="w-full flex flex-row justify-between items-start gap-4">
            <div className="w-1/2 flex flex-row justify-start gap-1">
              <p className="w-20 text-[13px] text-gray-600">Quantity: {cartItem.quantity}</p>
              {addItem && decreaseQuantity && (
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
              )}
            </div>

            <p className="w-1/2 flex justify-end text-end sm:text-lg text-sm font-medium">
              {(cartItem.price * cartItem.quantity).toFixed(2)} EGP
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem
