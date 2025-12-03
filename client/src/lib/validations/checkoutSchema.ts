import { z } from 'zod'

const egyptPhoneRegex = /^01[0-2,5][0-9]{8}$/

export const checkoutSchema = z.object({
  fullName: z.string().min(3, 'Name must be at least 3 characters long'),
  phoneNumber: z.string().regex(egyptPhoneRegex, 'Invalid phone number'),
  email: z.email('Invalid email address').optional().or(z.literal('')),
  address: z.string().min(16, 'Address must be at least 16 characters long'),
  apartment: z.string().optional(),
  city: z.string().min(3, "City's name must be at least 3 characters long"),
  area: z.string().min(3, "Area's name must be at least 3 characters long"),
  postalCode: z.string().regex(/^[1-9][0-9]*$/, 'Postal code must be a positive integer'),
  paymentMethod: z.enum(['COD', 'ONLINE']).default('COD'),
  orderNotes: z.string().optional().or(z.literal('')),
})

export type CheckoutSchema = z.infer<typeof checkoutSchema>
