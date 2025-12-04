import { Request, Response } from 'express'
import prisma from '../prismaClient'

const reserveProducts = async (req: Request, res: Response) => {
  const { cart } = req.body

  if (!cart) {
    return res.status(400).json({
      status: 'Failure',
      message: 'Missing required field: cart',
    })
  }

  const missing: any[] = []
  let totalPrice = 0
  const reservationIDs: string[] = []
  let resQty = 0

  try {
    // Use a transaction
    await prisma.$transaction(async (tx) => {
      // Step 1: Validate all items
      for (const item of cart) {
        const { id, quantity, price } = item

        // Quantity validation
        if (!quantity || !Number.isInteger(quantity) || quantity <= 0) {
          const err: any = new Error('INVALID_QUANTITY')
          err.type = 'INVALID_QUANTITY'
          err.data = { id, quantity }
          throw err
        }

        // Price validation
        if (!price || price <= 0) {
          const err: any = new Error('INVALID_PRICE')
          err.type = 'INVALID_PRICE'
          err.data = { id, price }
          throw err
        }

        // Fetch product inside the transaction
        const product = await tx.products.findUnique({ where: { id } })

        if (!product) {
          const err: any = new Error('PRODUCT_NOT_FOUND')
          err.type = 'PRODUCT_NOT_FOUND'
          err.data = { id }
          throw err
        }

        const activeReservations = await tx.productReservations.aggregate({
          where: {
            productID: id,
            status: 'ACTIVE',
            expiresAt: { gt: new Date() }, // not expired
          },
          _sum: { quantity: true },
        })

        const reservedQty = activeReservations._sum.quantity ?? 0
        resQty += reservedQty
        // Compute remaining available stock after reservations
        const available = product.stock - reservedQty

        if (available <= 0) {
          missing.push({
            productId: id,
            productName: product.name,
            productPrice: product.price,
            reason: 'OUT_OF_STOCK',
            available: 0,
            requested: quantity,
          })
          continue
        }

        if (available < quantity) {
          missing.push({
            productId: id,
            productName: product.name,
            productPrice: product.price,
            reason: 'INSUFFICIENT_STOCK',
            available: product.stock,
            requested: quantity,
          })
          continue
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

      // Step 3: Create reservation
      for (const item of cart) {
        let reservation = await tx.productReservations.create({
          data: {
            productID: item.id,
            quantity: item.quantity,
            expiresAt: new Date(Date.now() + 2 * 60 * 1000),
            status: 'ACTIVE',
          },
        })

        reservationIDs.push(reservation.id)
      }
    })

    // Step 4: Transaction committed successfully → return success
    return res.status(201).json({
      status: 'Success',
      message: 'Cart validated and reserved successfully',
      total: totalPrice.toFixed(2),
      cart,
      resQty,
      reservationIDs,
    })
  } catch (error: any) {
    // Handle missing items from transaction
    if (error.missing) {
      return res.status(409).json({
        status: 'Failure',
        message: 'Some items are invalid or out of stock',
        missing: error.missing,
      })
    }

    if (error.type === 'INVALID_QUANTITY') {
      return res.status(400).json({
        status: 'Failure',
        message: 'INVALID_QUANTITY',
        data: error.data,
      })
    }

    if (error.type === 'INVALID_PRICE') {
      return res.status(400).json({
        status: 'Failure',
        message: 'INVALID_PRICE',
        data: error.data,
      })
    }

    if (error.type === 'PRODUCT_NOT_FOUND') {
      return res.status(404).json({
        status: 'Failure',
        message: 'PRODUCT_NOT_FOUND',
        data: error.data,
      })
    }

    console.error(error)
    return res.status(500).json({
      status: 'Failure',
      message: 'Internal server error',
    })
  }
}

export default reserveProducts
