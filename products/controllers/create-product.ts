import { Request, Response } from 'express'
import { productSchema } from '../schemas/productSchema'
import prisma from '../prismaClient'

const createProduct = async (req: Request, res: Response) => {
  try {
    const parsed = productSchema.safeParse(req.body)

    if (!parsed.success) {
      return res.status(400).json({
        status: 'Failure',
        message: 'Validation error',
        errors: parsed.error,
      })
    }

    const product = await prisma.products.create({
      data: {
        ...parsed.data,
        description: parsed.data.description ?? null,
        price: Number(parsed.data.price.toFixed(2)),
      },
    })

    return res
      .status(201)
      .json({ status: 'Success', message: 'Product was added successfully.', data: product })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      status: 'Failure',
      message: 'Internal server error',
    })
  }
}

export default createProduct
