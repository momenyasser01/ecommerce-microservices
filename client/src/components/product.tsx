import Image from 'next/image'
import { Button } from './ui/button'
import { MinusIcon, PlusIcon } from 'lucide-react'
import { useCart } from '@/context/cart-context'
import { memo } from 'react'

interface ProductProps {
  id: string
  name: string
  description: string
  price: number
  stock: number
  weight: number
  measurement: string
  category: string
  image: string
}

const Product = ({
  id,
  name,
  description,
  price,
  stock,
  weight,
  measurement,
  category,
  image,
}: ProductProps) => {
  const { cart, addItem, decreaseQuantity } = useCart()
  const cartItem = cart.find((item) => item.id === id)
  const cartQuantity = cartItem ? cartItem.quantity : 0

  function handleAddToCart() {
    if (stock > 0) {
      addItem({
        id,
        name,
        description,
        price,
        weight,
        measurement,
        category,
        quantity: 1,
        stock,
        image,
      })
    }
  }

  function handleDecreaseCount() {
    decreaseQuantity(id)
  }

  return (
    <div className="w-full h-auto flex flex-col justify-between items-center p-5 rounded-2xl border-[2px] gap-4 bg-white">
      <Image
        src={image}
        alt={name}
        width={184}
        height={184}
        className={`flex h-32 w-32 sm:h-38 sm:w-38 md:h-46 md:w-46 overflow-hidden object-contain transition ${
          stock === 0 ? 'grayscale opacity-60' : ''
        }`}
        quality={30}
      />
      <p className="w-full font-medium md:text-lg text-sm h-16 text-start md:line-clamp-2 line-clamp-3">
        {name}
      </p>
      <div className="w-full flex flex-row justify-between items-center">
        <p className="text-gray-500 md:text-sm text-[11px]">{`${weight}${
          measurement === 'ML' ? 'ml' : measurement === 'G' ? 'g' : 'pcs'
        }`}</p>
        <p className="font-medium md:text-lg text-xs">{`${price} EGP`}</p>
      </div>
      {stock === 0 ? (
        <Button
          disabled
          className="w-full bg-gray-300 text-gray-600 cursor-not-allowed md:text-[17px] text-xs font-medium rounded-full h-8 md:h-10"
        >
          Out of Stock
        </Button>
      ) : cartQuantity === 0 ? (
        <Button
          onClick={handleAddToCart}
          className="w-full bg-green-600/95 hover:bg-[#00990A] rounded-full md:text-[17px] text-xs font-medium cursor-pointer h-8 md:h-10"
        >
          Add to cart
        </Button>
      ) : (
        <div className="flex flex-row justify-between items-center w-full md:h-10 h-8 rounded">
          <button
            onClick={handleDecreaseCount}
            className="w-8 h-8 flex justify-center items-center rounded-full cursor-pointer hover:bg-gray-100"
          >
            {''}
            <MinusIcon className="md:size-6 size-4.5 text-green-600/95" />
          </button>
          <p className="font-semibold md:text-lg text-sm">{cartQuantity}</p>

          <button
            disabled={cartQuantity === stock}
            onClick={handleAddToCart}
            className={`w-8 h-8 flex justify-center items-center rounded-full cursor-pointer ${
              cartQuantity === stock ? '' : 'hover:bg-gray-100'
            }`}
          >
            {''}
            <PlusIcon className={`md:size-6 size-4.5 ${cartQuantity === stock ? "text-green-700/20" : "text-green-600/95"} `} />
          </button>
        </div>
      )}
    </div>
  )
}

export default memo(Product)
