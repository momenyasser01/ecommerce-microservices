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
    <div className=" w-[100%] h-auto flex flex-col justify-between p-5 rounded-2xl border-[1px] shadow-sm gap-4 bg-white">
      <div className="relative flex w-full min-h-42 max-h-42 overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill={true}
          className={`object-contain transition ${stock === 0 ? 'grayscale opacity-60' : ''}`}
          quality={70}
        />
        {stock === 0 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            Out of Stock
          </span>
        )}
      </div>
      <p className="font-semibold text-lg h-16 line-clamp-2">{name}</p>
      <div className="flex flex-row justify-between items-center">
        <p className="text-gray-500 text-sm">{`${weight}${
          measurement === 'ML' ? 'ml' : measurement === 'G' ? 'g' : 'pcs'
        }`}</p>
        <p className="font-semibold text-lg">{`${price} EGP`}</p>
      </div>
      {stock === 0 ? (
        <Button disabled className="bg-gray-300 text-gray-600 cursor-not-allowed text-[17px] h-10">
          Out of Stock
        </Button>
      ) : cartQuantity === 0 ? (
        <Button onClick={handleAddToCart} className="bg-[#00B106] hover:bg-[#00990A] text-[17px] h-10">
          Add to cart
        </Button>
      ) : (
        <div className="flex flex-row justify-between items-center w-full h-9 rounded">
          <button
            onClick={handleDecreaseCount}
            className="w-8 h-8 flex justify-center items-center rounded-full hover:bg-gray-100"
          >
            {''}
            <MinusIcon className="size-6 text-[#00B106]" />
          </button>
          <p className="font-semibold text-lg">{cartQuantity}</p>

          <button
            onClick={handleAddToCart}
            className="w-8 h-8 flex justify-center items-center rounded-full hover:bg-gray-100"
          >
            {''}
            <PlusIcon className="size-6 text-[#00B106]" />
          </button>
        </div>
      )}
    </div>
  )
}

export default memo(Product)
