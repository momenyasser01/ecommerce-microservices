'use client'

import { useForm } from 'react-hook-form'
import Image from 'next/image'
import { zodResolver } from '@hookform/resolvers/zod'
import { checkoutSchema, CheckoutSchema } from '../../lib/validations/checkoutSchema'
import { CustomInput } from '@/components/CustomInput'
import { useCart } from '@/context/cart-context'
import { useState } from 'react'

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState('COD')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutSchema>({
    resolver: zodResolver(checkoutSchema),
  })

  const { cart, total } = useCart()

  const itemsCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  const onSubmit = async (data: CheckoutSchema) => {
    console.log(data)

    try {
      const response = await fetch('http://localhost:5002/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          paymentMethod,
          products: cart,
          total,
        }),
      })

      if (!response.ok) {
        console.error('Order failed')
        console.log(response)
        return
      }

      if (response.ok) {
        alert('Order created successfully')
        console.log(response)
      }

      const result = await response.json()

      console.log('ORDER CREATED:', result)
    } catch (error) {
      console.error('Network or server error:', error)
    }
  }

  return (
    <div className="w-full h-full flex xl:flex-row flex-col xl:justify-center xl:items-start justify-start items-center gap-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="xl:w-[580px] w-[94%] flex flex-col py-12 gap-4"
      >
        <CustomInput error={errors.fullName?.message}>
          <input
            {...register('fullName')}
            placeholder=" "
            className="peer w-full h-12.5 border-1 border-gray-300 focus:outline-[#00B106] rounded-sm px-[11px] transition-all ease-in-out duration-300"
          />
          <p
            className="absolute left-2 lg:top-[13.5px] top-2.5 lg:text-base text-sm text-gray-500 bg-white px-1 transition-all duration-300 ease-in-out pointer-events-none
              peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#00B106] peer-focus:z-1 peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-xs peer-placeholder-shown:left-2"
          >
            Full Name
          </p>
        </CustomInput>

        <CustomInput error={errors.phoneNumber?.message}>
          <input
            placeholder=" "
            {...register('phoneNumber')}
            className="peer w-full h-12.5 border-1 border-gray-300 focus:outline-[#00B106] rounded-sm px-[11px] transition-all ease-in-out duration-300"
          />
          <p
            className="absolute left-2 lg:top-[12.5px] top-2.5 lg:text-base text-sm text-gray-500 bg-white px-1 transition-all duration-300 ease-in-out pointer-events-none
              peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#00B106] peer-focus:z-1 peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-xs peer-placeholder-shown:left-2"
          >
            Phone Number
          </p>
        </CustomInput>

        <CustomInput error={errors.email?.message}>
          <input
            placeholder=" "
            {...register('email')}
            className="peer w-full h-12.5 border-1 border-gray-300 focus:outline-[#00B106] rounded-sm px-[11px] transition-all ease-in-out duration-300"
          />
          <p
            className="absolute left-2 lg:top-[12.5px] top-2.5 lg:text-base text-sm text-gray-500 bg-white px-1 transition-all duration-300 ease-in-out pointer-events-none
              peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#00B106] peer-focus:z-1 peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-xs peer-placeholder-shown:left-2"
          >
            Email Address (optional)
          </p>
        </CustomInput>

        <CustomInput error={errors.address?.message}>
          <input
            placeholder=" "
            {...register('address')}
            className="peer w-full h-12.5 border-1 border-gray-300 focus:outline-[#00B106] rounded-sm px-[11px] transition-all ease-in-out duration-300"
          />
          <p
            className="absolute left-2 lg:top-[12.5px] top-2.5 lg:text-base text-sm text-gray-500 bg-white px-1 transition-all duration-300 ease-in-out pointer-events-none
              peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#00B106] peer-focus:z-1 peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-xs peer-placeholder-shown:left-2"
          >
            Address
          </p>
        </CustomInput>

        <CustomInput error={errors.apartment?.message}>
          <input
            placeholder=" "
            {...register('apartment')}
            className="peer w-full h-12.5 border-1 border-gray-300 focus:outline-[#00B106] rounded-sm px-[11px] transition-all ease-in-out duration-300"
          />
          <p
            className="absolute left-2 lg:top-[12.5px] top-2.5 lg:text-base text-sm text-gray-500 bg-white px-1 transition-all duration-300 ease-in-out pointer-events-none
              peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#00B106] peer-focus:z-1 peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-xs peer-placeholder-shown:left-2"
          >
            Apartment, suite, etc. (optional)
          </p>
        </CustomInput>

        <div className="w-full flex xl:flex-row flex-col lg:gap-3 gap-4">
          <CustomInput className="col-span-1" error={errors.city?.message}>
            <input
              placeholder=" "
              {...register('city')}
              className="peer w-full h-12.5 border-1 border-gray-300 focus:outline-[#00B106] rounded-sm px-[11px] transition-all ease-in-out duration-300"
            />
            <p
              className="absolute left-2 lg:top-[12.5px] top-2.5 lg:text-base text-sm text-gray-500 bg-white px-1 transition-all duration-300 ease-in-out pointer-events-none
                      peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#00B106] peer-focus:z-1 peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-xs peer-placeholder-shown:left-2"
            >
              City
            </p>
          </CustomInput>

          <CustomInput className="col-span-1" error={errors.area?.message}>
            <input
              placeholder=" "
              {...register('area')}
              className="peer w-full h-12.5 border-1 border-gray-300 focus:outline-[#00B106] rounded-sm px-[11px] transition-all ease-in-out duration-300"
            />
            <p
              className="absolute left-2 lg:top-[12.5px] top-2.5 lg:text-base text-sm text-gray-500 bg-white px-1 transition-all duration-300 ease-in-out pointer-events-none
                      peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#00B106] peer-focus:z-1 peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-xs peer-placeholder-shown:left-2"
            >
              Area
            </p>
          </CustomInput>

          <CustomInput className="col-span-2 lg:col-span-1" error={errors.postalCode?.message}>
            <input
              placeholder=" "
              {...register('postalCode')}
              className="peer w-full h-12.5 border-1 border-gray-300 focus:outline-[#00B106] rounded-sm px-[11px] transition-all ease-in-out duration-300"
            />
            <p
              className="absolute left-2 lg:top-[12.5px] top-2.5 lg:text-base text-sm text-gray-500 bg-white px-1 transition-all duration-300 ease-in-out pointer-events-none
                      peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#00B106] peer-focus:z-1 peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-xs peer-placeholder-shown:left-2"
            >
              Postal Code
            </p>
          </CustomInput>
        </div>

        <textarea
          {...register('orderNotes')}
          placeholder="Share your notes... (optional)"
          className="w-full min-h-30 border-1 border-gray-300 placeholder:text-gray-500 lg:placeholder:text-base placeholder:text-sm focus:outline-[#00B106] rounded-sm px-[11px] py-2 transition-all ease-in-out duration-300"
        ></textarea>

        <div className="w-full flex flex-row justify-between items-start gap-3">
          <div
            onClick={() => setPaymentMethod('COD')}
            className={`w-full h-12.5 flex justify-center items-center border-2  rounded-sm font-medium cursor-pointer transition-all ease-in-out duration-200 ${
              paymentMethod === 'COD' ? 'text-black' : 'text-gray-500'
            } ${paymentMethod === 'COD' ? 'border-green-600/95' : 'border-gray-300'}`}
          >
            <p>Cash on delivery</p>
          </div>

          <div
            onClick={() => setPaymentMethod('ONLINE')}
            className={`w-full h-12.5 flex justify-center items-center border-2 rounded-sm font-medium cursor-pointer transition-all ease-in-out duration-200 ${
              paymentMethod === 'ONLINE' ? 'text-black' : 'text-gray-500'
            } ${paymentMethod === 'ONLINE' ? 'border-green-600/95' : 'border-gray-300'}`}
          >
            <p>Online payment</p>
          </div>
        </div>

        <button className="w-full h-12.5 rounded-sm text-white font-medium bg-green-600/95 hover:bg-[#00990A] transition-all ease-in-out duration-200">
          {`${
            isSubmitting
              ? 'Loading...'
              : paymentMethod === 'cashOnDelivery'
              ? 'Place order'
              : 'Pay now'
          }`}
        </button>
      </form>

      <div className="w-[1px] h-screen xl:flex hidden bg-gray-300"></div>

      <div className="w-[480px] flex flex-col justify-center items-start py-12 gap-7">
        <div className="w-full flex flex-col justify-center items-start gap-6">
          {cart.map((cartItem, index) => (
            <div key={index} className="w-full flex justify-between items-center">
              <div className="w-[75%] flex flex-row justify-start items-center gap-4">
                <div className="relative size-16">
                  <Image src={cartItem.image} alt={''} fill={true} className="" />
                  <div className="size-5.5 -right-2.5 -top-2.5 flex justify-center items-center text-xs text-white font-semibold rounded-full absolute bg-green-600/95">
                    {cartItem.quantity}
                  </div>
                </div>
                <p className="text-sm font-medium">{cartItem.name}</p>
              </div>
              <p className="text-sm font-medium">
                {(cartItem.price * cartItem.quantity).toFixed(2)} EGP
              </p>
            </div>
          ))}
        </div>

        <div className="w-full flex justify-between items-center gap-3">
          <CustomInput>
            <input
              title="Discount Code"
              value={''}
              placeholder=" "
              className="peer w-full h-12.5 border-1 border-gray-300 focus:outline-[#00B106] rounded-sm px-[11px] transition-all ease-in-out duration-300"
            />
            <p
              className="absolute left-2 lg:top-3 top-2.5 lg:text-base text-sm text-gray-500 bg-white px-1 transition-all duration-300 ease-in-out pointer-events-none
              peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#00B106] peer-focus:z-1 peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-xs peer-placeholder-shown:left-2"
            >
              Discount Code
            </p>
          </CustomInput>
          <button className="w-[20%] h-12.5 flex justify-center items-center text-white font-medium rounded-sm bg-green-600/95">
            Apply
          </button>
        </div>

        <div className="w-full flex flex-col justify-start items-start gap-2">
          <div className="w-full flex justify-between items-start">
            <div className="flex flex-row justify-center items-center text-sm font-medium gap-1">
              Subtotal <div className="size-[2px] rounded-full bg-black"></div> {itemsCount} items
            </div>
            <p className="text-sm font-medium">{total.toFixed(2)} EGP</p>
          </div>

          <div className="w-full flex justify-between items-start">
            <p className="text-sm font-medium">Shipping</p>
            <p className="text-sm font-medium">50 EGP</p>
          </div>
        </div>

        <div className="w-full flex justify-between items-start">
          <p className="text-xl font-semibold">Total</p>
          <p className="text-xl font-semibold">{(total + 50).toFixed(2)} EGP</p>
        </div>
      </div>
    </div>
  )
}

export default Checkout
