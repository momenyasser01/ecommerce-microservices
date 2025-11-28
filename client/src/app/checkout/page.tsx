'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { checkoutSchema, CheckoutSchema } from '../../lib/validations/checkoutSchema'
import { CustomInput } from '@/components/CustomeInput'
import { useCart } from '@/context/cart-context'
import SummaryCartItem from '@/components/summary-cart-item'

const Checkout = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutSchema>({
    resolver: zodResolver(checkoutSchema),
  })

  const { cart, total } = useCart()

  const taxes = Number(total) * (12.5 / 100)
  const absoluteTotal = Number(total) + 50 + taxes

  const itemsCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  const onSubmit = async (data: CheckoutSchema) => {
    console.log(data)
    // send to API route or server action
  }

  return (
    <div className="w-full h-full flex flex-col justify-start items-center py-8 gap-8">
      <h1 className="text-3xl font-bold border-b-4 border-[#00B106]">Checkout</h1>
      {/* <div className="w-[90%] flex justify-start items-center"></div> */}
      <div className="w-[90%] h-full flex sm:flex-row flex-col justify-center items-center gap-5">
        <div className="w-full flex flex-col justify-center items-center gap-8">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-7.5">
            <div className="w-full flex md:flex-row flex-col justify-between items-start gap-5">
              <div className="md:w-[60%] w-full flex flex-col justify-center items-center gap-4">
                <CustomInput error={errors.fullName?.message}>
                  <input
                    {...register('fullName')}
                    placeholder=" "
                    className="peer w-full h-10 border-2 border-gray-300 outline-[#00B106] rounded-sm px-[11px] bg-transparent"
                  />
                  <p
                    className="absolute left-2 lg:top-2 top-2.5 lg:text-base text-[13px] text-gray-500 bg-white px-1 transition-all duration-300 ease-in-out pointer-events-none
              peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#00B106] peer-focus:z-1 peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-xs peer-placeholder-shown:left-2"
                  >
                    Full Name
                  </p>
                </CustomInput>

                <CustomInput error={errors.phoneNumber?.message}>
                  <input
                    placeholder=" "
                    {...register('phoneNumber')}
                    className="peer w-full h-10 border-2 border-gray-300 outline-[#00B106] rounded-sm px-[11px]"
                  />
                  <p
                    className="absolute left-2 lg:top-2 top-2.5 lg:text-base text-[13px] text-gray-500 bg-white px-1 transition-all duration-300 ease-in-out pointer-events-none
              peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#00B106] peer-focus:z-1 peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-xs peer-placeholder-shown:left-2"
                  >
                    Phone Number
                  </p>
                </CustomInput>

                <CustomInput error={errors.email?.message}>
                  <input
                    placeholder=" "
                    {...register('email')}
                    className="peer w-full h-10 border-2 border-gray-300 outline-[#00B106] rounded-sm px-[11px]"
                  />
                  <p
                    className="absolute left-2 lg:top-2 top-2.5 lg:text-base text-[13px] text-gray-500 bg-white px-1 transition-all duration-300 ease-in-out pointer-events-none
              peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#00B106] peer-focus:z-1 peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-xs peer-placeholder-shown:left-2"
                  >
                    Email Address (optional)
                  </p>
                </CustomInput>

                <CustomInput error={errors.address?.message}>
                  <input
                    placeholder=" "
                    {...register('address')}
                    className="peer w-full h-10 border-2 border-gray-300 outline-[#00B106] rounded-sm px-[11px]"
                  />
                  <p
                    className="absolute left-2 lg:top-2 top-2.5 lg:text-base text-[13px] text-gray-500 bg-white px-1 transition-all duration-300 ease-in-out pointer-events-none
              peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#00B106] peer-focus:z-1 peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-xs peer-placeholder-shown:left-2"
                  >
                    Address
                  </p>
                </CustomInput>

                {/* <CustomInput error={errors.city?.message}>
            <input
              placeholder=" "
              {...register('city')}
              className="peer w-full h-10 border-2 border-gray-300 outline-[#00B106] rounded-sm px-[11px]"
            />
            <p
              className="absolute left-2 top-2 text-gray-500 bg-white px-1 transition-all duration-300 ease-in-out pointer-events-none
              peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#00B106] peer-focus:z-1 peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-xs peer-placeholder-shown:left-2"
            >
              City
            </p>
          </CustomInput> */}

                <div className="w-full flex flex-row justify-between items-start gap-3">
                  <CustomInput error={errors.area?.message}>
                    <input
                      placeholder=" "
                      {...register('area')}
                      className="peer w-full h-10 border-2 border-gray-300 outline-[#00B106] rounded-sm px-[11px]"
                    />
                    <p
                      className="absolute left-2 lg:top-2 top-2.5 lg:text-base text-[13px] text-gray-500 bg-white px-1 transition-all duration-300 ease-in-out pointer-events-none
              peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#00B106] peer-focus:z-1 peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-xs peer-placeholder-shown:left-2"
                    >
                      Area
                    </p>
                  </CustomInput>

                  <CustomInput error={errors.street?.message}>
                    <input
                      placeholder=" "
                      {...register('street')}
                      className="peer w-full h-10 border-2 border-gray-300 outline-[#00B106] rounded-sm px-[11px]"
                    />
                    <p
                      className="absolute left-2 lg:top-2 top-2.5 lg:text-base text-[13px] text-gray-500 bg-white px-1 transition-all duration-300 ease-in-out pointer-events-none
              peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#00B106] peer-focus:z-1 peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-xs peer-placeholder-shown:left-2"
                    >
                      Street
                    </p>
                  </CustomInput>
                </div>
                <div className="w-full grid grid-cols-2 lg:grid-cols-3 lg:gap-3 gap-4">
                  <CustomInput className="col-span-1" error={errors.buildingNumber?.message}>
                    <input
                      placeholder=" "
                      {...register('buildingNumber')}
                      className="peer w-full h-10 border-2 border-gray-300 outline-[#00B106] rounded-sm px-[11px]"
                    />
                    <p
                      className="absolute left-2 lg:top-2 top-2.5 lg:text-base text-[13px] text-gray-500 bg-white px-1 transition-all duration-300 ease-in-out pointer-events-none
                peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#00B106] peer-focus:z-1 peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-xs peer-placeholder-shown:left-2"
                    >
                      Building NO.
                    </p>
                  </CustomInput>

                  <CustomInput className="col-span-1" error={errors.floor?.message}>
                    <input
                      placeholder=" "
                      {...register('floor')}
                      className="peer w-full h-10 border-2 border-gray-300 outline-[#00B106] rounded-sm px-[11px]"
                    />
                    <p
                      className="absolute left-2 lg:top-2 top-2.5 lg:text-base text-[13px] text-gray-500 bg-white px-1 transition-all duration-300 ease-in-out pointer-events-none
                peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#00B106] peer-focus:z-1 peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-xs peer-placeholder-shown:left-2"
                    >
                      Floor
                    </p>
                  </CustomInput>

                  <CustomInput
                    className="col-span-2 lg:col-span-1"
                    error={errors.apartmentNumber?.message}
                  >
                    <input
                      placeholder=" "
                      {...register('apartmentNumber')}
                      className="peer w-full h-10 border-2 border-gray-300 outline-[#00B106] rounded-sm px-[11px]"
                    />
                    <p
                      className="absolute left-2 lg:top-2 top-2.5 lg:text-base text-[13px] text-gray-500 bg-white px-1 transition-all duration-300 ease-in-out pointer-events-none
                peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#00B106] peer-focus:z-1 peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-xs peer-placeholder-shown:left-2"
                    >
                      Apartment Number
                    </p>
                  </CustomInput>
                </div>

                <textarea
                  {...register('orderNotes')}
                  placeholder="Share your notes... (optional)"
                  className="w-full min-h-30 border-2 border-gray-300 placeholder:text-gray-500 outline-[#00B106] rounded-sm px-[11px] py-2"
                ></textarea>
              </div>
              <div className="md:w-[40%] w-full h-full flex flex-col justify-start items-start rounded-lg shadow-lg px-5 pb-8 pt-5 gap-4 bg-[#D9F7D9]">
                <h1 className="text-2xl font-semibold">Your Cart</h1>
                <div className="w-full">
                  {cart.map((cartItem, index) => (
                    <SummaryCartItem
                      key={index}
                      name={cartItem.name}
                      image={cartItem.image}
                      price={cartItem.price}
                      quantity={cartItem.quantity}
                    />
                  ))}
                </div>
                <div className="w-full flex justify-between items-center">
                  <p className="md:text-base text-sm font-semibold">Subtotal</p>
                  <p className="md:text-base text-sm font-semibold">{`${total.toFixed(2)} EGP`}</p>
                </div>
                <div className="w-full flex justify-between items-center">
                  <p className="md:text-base text-sm font-semibold">Shipping</p>
                  <p className="md:text-base text-sm font-semibold">{`50 EGP`}</p>
                </div>
                <div className="w-full flex justify-between items-center">
                  <p className="md:text-base text-sm font-semibold">Taxes</p>
                  <p className="md:text-base text-sm font-semibold">{`${taxes.toFixed(2)} EGP`}</p>
                </div>
                <hr className="w-full h-0.5  bg-black" />
                <div className="w-full flex justify-between items-center">
                  <p className="md:text-xl text-lg font-bold">Total</p>
                  <p className="md:text-xl text-lg font-bold">{`${absoluteTotal.toFixed(
                    2,
                  )} EGP`}</p>
                </div>
                <button
                  disabled={isSubmitting}
                  className="w-full h-11 flex justify-center items-center rounded-sm text-white font-semibold bg-[#00B106] hover:bg-[#00990A] transition-all ease-in-out duration-200"
                >
                  {isSubmitting ? 'Loading...' : 'Place Order'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Checkout
