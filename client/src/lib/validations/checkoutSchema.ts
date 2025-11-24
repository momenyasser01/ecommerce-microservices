import { z } from 'zod'

const egyptPhoneRegex = /^(?:\+?20)?1[0-2,5][0-9]{8}$/

export const checkoutSchema = z.object({
  fullName: z.string().min(3, 'Name must be at least 3 characters long'),
  phoneNumber: z.string().regex(egyptPhoneRegex, 'Invalid phone number'),
  email: z.preprocess(
    (val) => (val === '' ? undefined : val),
    z.email('Invalid email address').optional(),
  ),
  address: z.string().min(16, 'Address must be at least 16 characters long'),
  city: z.string().min(3, "City's name must be at least 3 characters long"),
  area: z.string().min(3, "Area's name must be at least 3 characters long"),
  street: z.string().nonempty('Street field is required'),
  buildingNumber: z.string().regex(/^[1-9][0-9]*$/, 'Building number must be a positive integer'),
  floor: z.string().nonempty('Floor field is required'),
  apartmentNumber: z.string().regex(/^[1-9][0-9]*$/, 'Apartment number must be a positive integer'),
  orderNotes: z.preprocess((val) => (val === '' ? undefined : val), z.string().optional()),
})

export type CheckoutSchema = z.infer<typeof checkoutSchema>
