import { Request, Response } from 'express'
import { isValidObjectId } from 'mongoose'
import prisma from '../prismaClient'

const deleteOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    if (!id) return res.status(400).json({ status: 'Failure', message: 'Missing required field' })

    if (!isValidObjectId(id))
      return res.status(400).json({ status: 'Failure', message: 'Invalid order id' })

    await prisma.orders.delete({ where: { id } })

    return res.status(204)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ status: 'Failure', message: 'Internal server error' })
  }
}

export default deleteOrder
