import { Request, Response } from 'express'
import prisma from '../prismaClient'
import { isValidObjectId } from 'mongoose'

const getOrderById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    if (!id) return res.status(400).json({ status: 'Failure', message: 'Missing id parameter' })

    if (!isValidObjectId(id))
      return res.status(400).json({ status: 'Failure', message: 'Invalid order id' })

    const order = await prisma.orders.findUnique({ where: { id } })

    if (!order)
      return res.status(404).json({ status: 'Failure', message: 'No order was found with this id' })

    return res.status(200).json({ status: 'Success', data: order })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ status: 'Failure', message: 'Internal server error' })
  }
}

export default getOrderById
