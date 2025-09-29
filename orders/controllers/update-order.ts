import { Request, Response } from 'express'
import prisma from '../prismaClient'
import { OrderStatus, Prisma } from '@prisma/client'

const updateOrder = async (req: Request, res: Response) => {
  try {
    const { id, products, total, status } = req.body

    if (products && !status) {
      const order = await prisma.orders.findUnique({ where: { id } })

      if (!order)
        return res
          .status(404)
          .json({ status: 'Failure', message: 'No order was found with this id' })

      if (order.status === OrderStatus.DELIVERED || order.status === OrderStatus.CANCELLED)
        return res.status(400).json({
          status: 'Failure',
          message: "Order can't be edited if it has been delivered or canceled already",
        })

      const updatedOrder = await prisma.orders.update({ where: { id }, data: { products, total } })

      return res
        .status(200)
        .json({ status: 'Success', message: 'Order was updated successfully', data: updatedOrder })
    }

    if (!products && status) {
      const normalized = status.toString().trim().toUpperCase()

      const order = await prisma.orders.findUnique({ where: { id } })

      if (!order)
        return res
          .status(404)
          .json({ status: 'Failure', message: 'No order was found with this id' })

      if (order.status !== OrderStatus.CREATED)
        return res.status(400).json({
          status: 'Failure',
          message: "Order status can't be changed if it has been delivered or canceled already",
        })

      if (order.status === normalized)
        return res
          .status(400)
          .json({ status: 'Failure', message: 'No need to change CREATED status to CREATED' })

      const updatedOrder = await prisma.orders.update({
        where: { id },
        data: { status: normalized as OrderStatus },
      })

      return res
        .status(200)
        .json({ status: 'Success', message: 'Order was updated successfully', data: updatedOrder })
    }

    return res
      .status(400)
      .json({ status: 'Failure', message: 'Something went wrong or invalid fields' })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025')
      return res.status(404).json({ status: 'Failure', message: 'Order was not found' })
    console.error(error)
    return res.status(500).json({ status: 'Failure', message: 'Internal server error' })
  }
}

export default updateOrder
