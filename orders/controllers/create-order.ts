import { Request, Response } from 'express'
import { orderSchema } from '../schemas/orderSchema'
import { publishOrderPublished } from '../kafka/publisher'
import axios from 'axios'
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

    try {
      const reservationsResponse = await axios.post('http://localhost:5000/products/reserve', {
        cart: parsed.data.products,
      })

      console.log(reservationsResponse)

      const { status, missing, reservationIDs } = reservationsResponse.data

      if (status === 'Failure' && reservationsResponse.status === 409 && !missing)
        return res.status(409).json({
          status: 'Failure',
          message: 'Some items are invalid or out of stock',
          missing: missing,
        })

      if (status === 'Failure' && missing) {
        return res.status(409).json({
          status: 'Failure',
          message: 'Some items are invalid or out of stock',
          missing: missing,
        })
      } else if (status === 'Failure' && !missing) {
        return res
          .status(500)
          .json({ status: 'Failure', message: 'Something went wrong with reservation' })
      } else {
        const newOrder = await prisma.orders.create({
          data: { ...parsed.data, status: 'CREATED', paymentMethod: 'COD' },
        })

        try {
          publishOrderPublished({
            orderId: newOrder.id,
            items: newOrder.products,
            email: newOrder.email ? newOrder.email : undefined,
            paymentMethod: newOrder.paymentMethod as 'COD' | 'ONLINE',
            reservationIDs,
          })
        } catch (error) {
          console.error('Failed to publish order to Kafka:', error)
        }

        return res
          .status(201)
          .json({ status: 'Success', message: 'Order created successfully', data: newOrder })
      }
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        // return missing items to frontend
        return res.status(409).json(error.response.data)
      }

      console.error(error)
      return res.status(500).json({ message: 'Internal server error' })
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({ status: 'Failure', message: 'Internal server error' })
  }
}

export default createOrder
