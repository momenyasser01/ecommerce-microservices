'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { checkoutSchema, CheckoutSchema } from '../../lib/validations/checkoutSchema'

const Checkout = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutSchema>({
    resolver: zodResolver(checkoutSchema),
  })

  const onSubmit = async (data: CheckoutSchema) => {
    console.log(data)
    // send to API route or server action
  }

  return (
    <div className="w-full flex justify-center items-center py-8">
      <div className="w-[60%] flex flex-col justify-center items-center gap-8">
        <h1 className="text-2xl font-bold border-b-4 border-[#00B106]">Checkout</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
          <div>
            <label>Email</label>
            <input {...register('email')} className="input" />
            {errors.email && <p className="error">{errors.email.message}</p>}
          </div>

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
