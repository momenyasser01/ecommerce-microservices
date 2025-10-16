'use client'

import Image from 'next/image'
import { Button } from './ui/button'
import { useState } from 'react'
import { MinusIcon, PlusIcon } from 'lucide-react'

interface ProductProps {
  name: string
  price: number
  weight: number
  measurement: string
  image: string
}

const Product = ({
  name,
  /*description,*/ price,
  /*quantity,*/ weight,
  measurement,
  /*category,*/ image,
}: ProductProps) => {
  const [quantity, setQuantity] = useState(0)

  function handleAddToCart() {
    if (quantity < 99) setQuantity((q) => q + 1)
  }

  function handleDecreaseCount() {
    if (quantity > 0) setQuantity((q) => q - 1)
  }

  return (
    <div className="flex flex-col justify-between p-5 rounded-2xl border-[1px] shadow-sm gap-4 w-[100%] h-auto bg-white">
      <div className="relative flex w-full min-h-42 max-h-42 overflow-hidden">
        <Image src={image} alt={name} fill={true} className="object-contain" />
      </div>
      <p className="font-semibold text-lg h-16 line-clamp-2">{name}</p>
      <div className="flex flex-row justify-between items-center">
        <p className="text-gray-500 text-sm">{`${weight}${
          measurement === 'ML' ? 'ml' : measurement === 'G' ? 'g' : 'pcs'
        }`}</p>
        <p className="font-semibold text-lg">{`${price} EGP`}</p>
      </div>
      {quantity === 0 ? (
        <Button onClick={handleAddToCart} className="bg-[#12BC07] hover:bg-green-600">
          Add to cart
        </Button>
      ) : (
        <div className="flex flex-row justify-between items-center w-full h-9 rounded">
          <button
            onClick={handleDecreaseCount}
            className="w-8 h-8 flex justify-center items-center rounded-full hover:bg-gray-100"
          >
            <MinusIcon className="size-6 text-[#12BC07]" />
          </button>
          <p className="">{quantity}</p>

          <button
            onClick={handleAddToCart}
            className="w-8 h-8 flex justify-center items-center rounded-full hover:bg-gray-100"
          >
            <PlusIcon className="size-6 text-[#12BC07]" />
          </button>
        </div>
      )}
    </div>
  )
}

export default Product
