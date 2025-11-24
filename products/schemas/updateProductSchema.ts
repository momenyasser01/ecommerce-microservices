import { z } from 'zod'
import { Category, Measurement } from '@prisma/client'

export const updateProductSchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  description: z
    .string()
    .min(1, "If you are updating description it can't be empty")
    .nullable()
    .optional(),
  price: z.number().positive('Price must be greater than 0').optional(),
  stock: z.number().int().positive('Quantity must be a positive integer').optional(),
  weight: z.number().int().positive('Weight must be greater than 0').optional(),
  measurement: z.enum(Measurement).optional(),
  category: z.enum(Category).optional(),
  image: z.url('Image must be a valid URL').optional(),
})

export type UpdateProductInput = z.infer<typeof updateProductSchema>
