import { Request, Response } from 'express'
import prisma from '../prismaClient'

const validateAndUpdateStock = async (req: Request, res: Response) => {
  const { cart } = req.body

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
      // Step 1: Validate all items
      for (const item of cart) {
        const { id, quantity, price } = item

        // Quantity validation
        if (!quantity || !Number.isInteger(quantity) || quantity <= 0) {
          missing.push({
            productId: id,
            reason: 'INVALID_QUANTITY',
            requested: quantity,
          })
          continue
        }

        // Price validation
        if (!price || price <= 0) {
          missing.push({
            productId: id,
            reason: 'INVALID_PRICE',
            price,
          })
          continue
        }

        // Fetch product inside the transaction
        const product = await tx.products.findUnique({ where: { id } })

        if (!product) {
          missing.push({
            productId: id,
            reason: 'NOT_FOUND',
          })
          continue
        }

        if (product.stock === 0) {
          missing.push({
            productId: id,
            reason: 'OUT_OF_STOCK',
            available: 0,
            requested: quantity,
          })
          continue
        }

        if (product.stock < quantity) {
          missing.push({
            productId: id,
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
