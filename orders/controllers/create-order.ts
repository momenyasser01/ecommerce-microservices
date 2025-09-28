import { Request, Response } from 'express'
import { orderSchema } from '../schemas/orderSchema'
import prisma from '../prismaClient'

const createOrder = async (req: Request, res: Response) => {
  try {
    const parsed = orderSchema.safeParse(req.body)

    if (!parsed.success) {
      return res.status(400).json({
        status: 'Failure',
        message: 'Validation error',
        errors: parsed.error,
      })
    }

    const newOrder = await prisma.orders.create({ data: parsed.data })

    return res.status(201).json({ status: 'Success', data: newOrder })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ status: 'Failure', message: 'Internal server error' })
  }
}

export default createOrder
