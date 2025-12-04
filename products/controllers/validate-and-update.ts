import { Request, Response } from 'express'
import prisma from '../prismaClient'

const validateAndUpdateStock = async (req: Request, res: Response) => {
  const { cart, reservationIDs } = req.body

  if (!cart) {
    return res.status(400).json({
      status: 'Failure',
      message: 'Missing required field: cart',
    })
  }

  const missing: any[] = []
  let totalPrice = 0

  try {
    // Use a transaction
    await prisma.$transaction(async (tx) => {
      for (const resID of reservationIDs) {
        const reservation = await tx.productReservations.findUnique({ where: { id: resID } })

        if (!reservation)
          return res
            .status(404)
            .json({ status: 'Failure', message: 'Reservation not found', data: reservation })

        if (reservation.status !== 'ACTIVE' || reservation.expiresAt < new Date(Date.now()))
          return res.status(400).json({
            status: 'Failure',
            message: 'Reservation INACTIVE or expired',
            data: reservation,
          })
      }

      // Step 1: Validate all items
      for (const item of cart) {
        const { id, quantity, price } = item

        // Quantity validation
        if (!quantity || !Number.isInteger(quantity) || quantity <= 0) {
          return res.status(400).json({
            status: 'Failure',
            message: 'INVALID_QUANTITY',
            data: { id, reason: 'INVALID_QUANTITY', quantity },
          })
        }

        // Price validation
        if (!price || price <= 0) {
          return res.status(400).json({
            status: 'Failure',
            message: 'INVALID_PRICE',
            data: { id, reason: 'INVALID_PRICE', price },
          })
        }

        // Fetch product inside the transaction
        const product = await tx.products.findUnique({ where: { id } })

        if (!product) {
          return res.status(404).json({
            status: 'Failure',
            message: 'PRODUCT_NOT_FOUND',
            data: { reason: 'PRODUCT_NOT_FOUND', id },
          })
        }

        if (product.stock === 0) {
          missing.push({
            id,
            reason: 'PRODUCT_OUT_OF_STOCK',
            available: 0,
            requested: quantity,
          })
          return res.status(409).json({
            status: 'Failure',
            message: 'PRODUCT_OUT_OF_STOCK',
            data: { reason: 'PRODUCT_OUT_OF_STOCK', id },
          })
        }

        if (product.stock < quantity) {
          missing.push({
            id,
            reason: 'INSUFFICIENT_STOCK',
            available: product.stock,
            requested: quantity,
          })
          return res.status(400).json({
            status: 'Failure',
            message: 'INSUFFICIENT_STOCK',
            data: { reason: 'INSUFFICIENT_STOCK', id },
          })
        }

        // Valid → accumulate total price
        totalPrice += product.price * quantity
      }

      // Step 2: If any missing → abort transaction by throwing error
      if (missing.length > 0) {
        const error = new Error('Some items invalid or out of stock')
        ;(error as any).missing = missing
        throw error
      }

      // Step 3: Deduct stock for all items
      for (const item of cart) {
        await tx.products.update({
          where: { id: item.id },
          data: { stock: { decrement: item.quantity } },
        })
      }
    })

    // Step 4: Transaction committed successfully → return success
    return res.status(200).json({
      status: 'Success',
      message: 'Cart validated and stock updated successfully',
      total: totalPrice.toFixed(2),
      cart,
    })
  } catch (error: any) {
    // Handle missing items from transaction
    if (error.missing) {
      console.log(error.missing)
      return res.status(409).json({
        status: 'Failure',
        message: 'Some items are invalid or out of stock',
        missing: error.missing,
      })
    }

    console.error(error)
    return res.status(500).json({
      status: 'Failure',
      message: 'Internal server error',
    })
  }
}

export default validateAndUpdateStock
