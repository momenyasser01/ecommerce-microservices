import { Request, Response } from 'express'
import { isValidObjectId } from 'mongoose'
import prisma from '../prismaClient'
import { Prisma } from '@prisma/client'

const deleteOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    if (!id) return res.status(400).json({ status: 'Failure', message: 'Missing required field' })

    if (!isValidObjectId(id))
      return res.status(400).json({ status: 'Failure', message: 'Invalid order id' })

    await prisma.orders.delete({ where: { id } })

    return res.status(204).json({})
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025')
      return res.status(404).json({ status: 'Failure', message: 'Order was not found' })
    console.error(error)
    return res.status(500).json({ status: 'Failure', message: 'Internal server error' })
  }
}

export default deleteOrder
