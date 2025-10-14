'use client'

import Image from 'next/image'
import { Button } from './ui/button'

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
      <Button className="bg-[#12BC07] hover:bg-green-600">Add to cart</Button>
    </div>
  )
}

export default Product
