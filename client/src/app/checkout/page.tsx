'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { checkoutSchema, CheckoutSchema } from '../../lib/validations/checkoutSchema'
import { CustomInput } from '@/components/CustomeInput'
import { useCart } from '@/context/cart-context'

const Checkout = () => {
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
    // send to API route or server action
  }

  return (
    <div className="w-full flex justify-center items-center py-8">
      <div className="lg:w-[50%] w-[90%] flex flex-col justify-center items-center gap-8">
        <h1 className="text-2xl font-bold border-b-4 border-[#00B106]">Checkout</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
          <CustomInput error={errors.fullName?.message}>
            <div className="relative w-full">
              <input
                {...register('fullName')}
                placeholder=" "
                className="peer w-full h-10 border-2 border-gray-300 outline-[#00B106] rounded-sm px-4 bg-transparent"
              />
              <p
                className="absolute left-3 top-2 text-gray-500 bg-white px-1 transition-all duration-300 ease-in-out pointer-events-none
              peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#00B106] peer-focus:z-1 peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-xs peer-placeholder-shown:left-3"
              >
                Full Name
              </p>
            </div>
          </CustomInput>

          <CustomInput error={errors.phoneNumber?.message}>
            <input
              placeholder=" "
              {...register('phoneNumber')}
              className="peer w-full h-10 border-2 border-gray-300 outline-[#00B106] rounded-sm px-4"
            />
            <p
              className="absolute left-3 top-2 text-gray-500 bg-white px-1 transition-all duration-300 ease-in-out pointer-events-none
              peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#00B106] peer-focus:z-1 peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-xs peer-placeholder-shown:left-3"
            >
              Phone Number
            </p>
          </CustomInput>

          <CustomInput error={errors.email?.message}>
            <input
              placeholder=" "
              {...register('email')}
              className="peer w-full h-10 border-2 border-gray-300 outline-[#00B106] rounded-sm px-4"
            />
            <p
              className="absolute left-3 top-2 text-gray-500 bg-white px-1 transition-all duration-300 ease-in-out pointer-events-none
              peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#00B106] peer-focus:z-1 peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-xs peer-placeholder-shown:left-3"
            >
              Email Address (optional)
            </p>
          </CustomInput>

          <CustomInput error={errors.address1?.message}>
            <input
              placeholder=" "
              {...register('address1')}
              className="peer w-full h-10 border-2 border-gray-300 outline-[#00B106] rounded-sm px-4"
            />
            <p
              className="absolute left-3 top-2 text-gray-500 bg-white px-1 transition-all duration-300 ease-in-out pointer-events-none
              peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#00B106] peer-focus:z-1 peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-xs peer-placeholder-shown:left-3"
            >
              Address 1
            </p>
          </CustomInput>

          <CustomInput error={errors.address2?.message}>
            <input
              placeholder=" "
              {...register('address2')}
              className="peer w-full h-10 border-2 border-gray-300 outline-[#00B106] rounded-sm px-4"
            />
            <p
              className="absolute left-3 top-2 text-gray-500 bg-white px-1 transition-all duration-300 ease-in-out pointer-events-none
              peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#00B106] peer-focus:z-1 peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-xs peer-placeholder-shown:left-3"
            >
              Address 2 (optional)
            </p>
          </CustomInput>

          <CustomInput error={errors.city?.message}>
            <input
              placeholder=" "
              {...register('city')}
              className="peer w-full h-10 border-2 border-gray-300 outline-[#00B106] rounded-sm px-4"
            />
            <p
              className="absolute left-3 top-2 text-gray-500 bg-white px-1 transition-all duration-300 ease-in-out pointer-events-none
              peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#00B106] peer-focus:z-1 peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-xs peer-placeholder-shown:left-3"
            >
              City
            </p>
          </CustomInput>

          <CustomInput error={errors.area?.message}>
            <input
              placeholder=" "
              {...register('area')}
              className="peer w-full h-10 border-2 border-gray-300 outline-[#00B106] rounded-sm px-4"
            />
            <p
              className="absolute left-3 top-2 text-gray-500 bg-white px-1 transition-all duration-300 ease-in-out pointer-events-none
              peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#00B106] peer-focus:z-1 peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-xs peer-placeholder-shown:left-3"
            >
              Area
            </p>
          </CustomInput>

          <CustomInput error={errors.street?.message}>
            <input
              placeholder=" "
              {...register('street')}
              className="peer w-full h-10 border-2 border-gray-300 outline-[#00B106] rounded-sm px-4"
            />
            <p
              className="absolute left-3 top-2 text-gray-500 bg-white px-1 transition-all duration-300 ease-in-out pointer-events-none
              peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#00B106] peer-focus:z-1 peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-xs peer-placeholder-shown:left-3"
            >
              Street
            </p>
          </CustomInput>

          <div className="w-full flex sm:flex-row flex-col justify-between items-start sm:gap-3 gap-4">
            <CustomInput error={errors.buildingNumber?.message}>
              <input
                placeholder=" "
                {...register('buildingNumber')}
                className="peer w-full h-10 border-2 border-gray-300 outline-[#00B106] rounded-sm px-4"
              />
              <p
                className="absolute left-3 top-2 text-gray-500 bg-white px-1 transition-all duration-300 ease-in-out pointer-events-none
                peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#00B106] peer-focus:z-1 peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-xs peer-placeholder-shown:left-3"
              >
                Building Number
              </p>
            </CustomInput>

            <CustomInput error={errors.floor?.message}>
              <input
                placeholder=" "
                {...register('floor')}
                className="peer w-full h-10 border-2 border-gray-300 outline-[#00B106] rounded-sm px-4"
              />
              <p
                className="absolute left-3 top-2 text-gray-500 bg-white px-1 transition-all duration-300 ease-in-out pointer-events-none
                peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#00B106] peer-focus:z-1 peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-xs peer-placeholder-shown:left-3"
              >
                Floor
              </p>
            </CustomInput>

            <CustomInput error={errors.apartmentNumber?.message}>
              <input
                placeholder=" "
                {...register('apartmentNumber')}
                className="peer w-full h-10 border-2 border-gray-300 outline-[#00B106] rounded-sm px-4"
              />
              <p
                className="absolute left-3 top-2 text-gray-500 bg-white px-1 transition-all duration-300 ease-in-out pointer-events-none
                peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#00B106] peer-focus:z-1 peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-xs peer-placeholder-shown:left-3"
              >
                Apartment Number
              </p>
            </CustomInput>
          </div>

          <textarea
            {...register('orderNotes')}
            placeholder="Share your notes... (optional)"
            className="w-full min-h-30 border-2 border-gray-300 placeholder:text-gray-500 outline-[#00B106] rounded-sm px-4 py-2"
          ></textarea>

          <button
            disabled={isSubmitting}
            className="w-full h-10 flex justify-center items-center rounded-sm text-white font-semibold bg-[#00B106] hover:bg-[#00990A] transition-all ease-in-out duration-200"
          >
            {isSubmitting ? 'Loading...' : 'Place Order'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Checkout
