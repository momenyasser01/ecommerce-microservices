import { z } from 'zod'

const egyptPhoneRegex = /^(?:\+?20)?1[0-2,5][0-9]{8}$/

export const checkoutSchema = z.object({
  fullName: z.string().min(3),
  phoneNumber: z.string().regex(egyptPhoneRegex),
  email: z.email().optional(),
  address1: z.string().min(16),
  address2: z.string().min(16).optional(),
  city: z.string().min(3),
  area: z.string().min(3),
  street: z.string().min(3),
  buildingNumber: z.number().gt(0),
  floor: z.string().min(3),
  apartmentNumber: z.number().gt(0),
})

export type CheckoutSchema = z.infer<typeof checkoutSchema>
