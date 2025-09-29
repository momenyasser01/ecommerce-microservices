import { z } from 'zod'
import { Category, Measurement } from '@prisma/client'

export const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().nullable().optional(),
  price: z.number().positive('Price must be greater than 0'),
  quantity: z.number().int().positive('Quantity must be a positive integer'),
  weight: z.number().int().positive('Weight must be greater than 0'),
  measurement: z.enum(Measurement),
  category: z.enum(Category),
  image: z.url('Image must be a valid URL'),
})

export type ProductInput = z.infer<typeof productSchema>
