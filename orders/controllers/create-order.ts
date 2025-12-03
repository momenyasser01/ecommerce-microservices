import { Request, Response } from 'express'
import { orderSchema } from '../schemas/orderSchema'
import { publishOrderPublished } from '../kafka/publisher'
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

    const newOrder = await prisma.orders.create({
      data: { ...parsed.data, status: 'PENDING', paymentMethod: 'COD' },
    })

    try {
      publishOrderPublished({
        orderId: newOrder.id,
        items: newOrder.products,
        email: newOrder.email ? newOrder.email : undefined,
        paymentMethod: newOrder.paymentMethod as 'COD' | 'ONLINE',
      })
    } catch (error) {
      console.error('Failed to publish order to Kafka:', error)
    }

    const waitForOrderStatus = async (orderId: string, timeoutMs = 5000, intervalMs = 100) => {
      const start = Date.now()

      while (Date.now() - start < timeoutMs) {
        try {
          const order = await prisma.orders.findUnique({ where: { id: orderId } })
          if (!order) return null

          if (order.status === 'CREATED') return order
          if (order.status === 'CANCELLED') return order
        } catch (error) {
          console.error(error)
        }

        await new Promise((resolve) => setTimeout(resolve, intervalMs)) // wait a bit before retry
      }

      return null // timeout
    }

    const statusCheckOrder = await waitForOrderStatus(newOrder.id, 3000, 100)

    if (statusCheckOrder?.status === 'CREATED') {
      return res.status(201).json({
        status: 'Success',
        message: 'Order created successfully',
        data: statusCheckOrder,
      })
    } else if (statusCheckOrder?.status === 'CANCELLED') {
      return res.status(409).json({
        status: 'Failure',
        message: 'Order was cancelled due to stock issues',
        data: statusCheckOrder,
      })
    }

    return res
      .status(202)
      .json({ status: 'Success', message: 'Order is being processed', data: newOrder })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ status: 'Failure', message: 'Internal server error' })
  }
}

export default createOrder
