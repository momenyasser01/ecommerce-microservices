import Image from 'next/image'

interface CartItemProps {
  name: string
  price: number
  image: string
  quantity: number
}

const SummaryCartItem = ({ name, price, image, quantity }: CartItemProps) => {
  return (
    <div className="relative w-full flex flex-row justify-between items-center px-0 py-4 sm:gap-0 gap-4">
      <div className="w-[65%] flex flex-row justify-center items-center gap-4">
        <div className='relative flex justify-center items-center w-23 h-16'>
          <div className='absolute top-0 right-0 w-5 h-5 flex justify-center items-center rounded-full text-white text-sm font-semibold bg-[#00B106]'>{quantity}</div>
          <Image src={image} alt="Product image" width={64} height={64} quality={70} />
        </div>
        <div className="w-full flex flex-col justify-start items-start gap-2">
          <p className="w-full md:text-base text-sm font-semibold">{name}</p>
        </div>
      </div>
      <div className="w-[35%] flex flex-row justify-end items-center sm:gap-4 gap-2">
        <p className="flex text-end md:text-base text-sm font-semibold">
          {(price * quantity).toFixed(2)} EGP
        </p>
      </div>
    </div>
  )
}

export default SummaryCartItem
