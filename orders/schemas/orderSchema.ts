import { z } from 'zod'

export const orderProductSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  description: z.string().optional().nullable(),
  price: z.number().nonnegative('Price must be >= 0'),
  quantity: z.number().int().positive('Quantity must be > 0'),
  weight: z.number().int().nonnegative('Weight must be >= 0'),
  measurement: z.string().min(1, 'Measurement unit is required'),
  image: z.url('Image must be a valid URL'),
})

export const orderSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.email('Invalid email address'),
  phone: z.string().optional().nullable(),
  products: z.array(orderProductSchema).min(1, 'At least one product is required'),
  country: z.string().min(1, 'Country is required'),
  city: z.string().min(1, 'City is required'),
  area: z.string().min(1, 'Area is required'),
  street: z.string().min(1, 'Street is required'),
  building: z.string().min(1, 'Building is required'),
  floor: z.string().min(1, 'Floor is required'),
  apartmentNumber: z.string().optional().nullable(),
  status: z.enum(['CREATED', 'DELIVERED', 'CANCELLED']).default('CREATED'),
  total: z.number().nonnegative('Total must be >= 0'),
})

export type OrderInput = z.infer<typeof orderSchema>
export type OrderProductInput = z.infer<typeof orderProductSchema>
