import { z } from 'zod'

export const orderProductSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Product name is required'),
  // description: z.string().optional(),
  price: z.number().positive('Price must be > 0'),
  quantity: z.number().int().positive('Quantity must be > 0'),
  weight: z.number().int().positive('Weight must be > 0'),
  measurement: z.string().min(1, 'Measurement unit is required'),
  image: z.url('Image must be a valid URL'),
})

export const orderSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  phoneNumber: z.string(),
  email: z.email('Invalid email address').optional(),
  products: z.array(orderProductSchema).min(1, 'At least one product is required'),
  address: z.string().min(16, 'Address needs to be at least 16 characters long'),
  apartment: z.string().optional().nullable(),
  city: z.string().min(1, 'City is required'),
  area: z.string().min(1, 'Area is required'),
  postalCode: z.string(),
  paymentMethod: z.enum(['COD', 'ONLINE']).default('COD'),
  status: z.enum(['PENDING', 'CREATED', 'DELIVERED', 'CANCELLED']).default('PENDING'),
  total: z.number().positive('Total must be > 0'),
})

export type OrderInput = z.infer<typeof orderSchema>
export type OrderProductInput = z.infer<typeof orderProductSchema>
