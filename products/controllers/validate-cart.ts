import { Request, Response } from 'express'
import prisma from '../prismaClient'

const validateCart = async (req: Request, res: Response) => {
  try {
    const { cart } = req.body

    if (!cart) {
      return res.status(400).json({
        status: 'Failure',
        message: 'Missing required field: cart',
      })
    }

    let totalPrice = 0
    const missing: any[] = []

    for (const item of cart) {
      const { id, quantity, price } = item

      // Validate quantity
      if (!quantity || !Number.isInteger(quantity) || quantity <= 0) {
        missing.push({
          productId: id,
          reason: 'INVALID_QUANTITY',
          requested: quantity,
        })
        continue
      }

      // Validate price
      if (price <= 0) {
        missing.push({
          productId: id,
          reason: 'INVALID_PRICE',
          price,
        })
        continue
      }

      // Fetch product
      const product = await prisma.products.findUnique({ where: { id } })

      if (!product) {
        missing.push({
          productId: id,
          reason: 'NOT_FOUND',
        })
        continue
      }

      // Out of stock
      if (product.stock === 0) {
        missing.push({
          productId: id,
          reason: 'OUT_OF_STOCK',
          available: 0,
          requested: quantity,
        })
        continue
      }

      // Insufficient stock
      if (product.stock < quantity) {
        missing.push({
          productId: id,
          reason: 'INSUFFICIENT_STOCK',
          available: product.stock,
          requested: quantity,
        })
        continue
      }

      // Valid item → add to total
      totalPrice += product.price * quantity
    }

    // If anything is missing → return failure
    if (missing.length > 0) {
      return res.status(409).json({
        status: 'Failure',
        message: 'Some items are invalid or out of stock',
        missing,
      })
    }

    // All good → return success
    return res.status(200).json({
      status: 'Success',
      message: 'Cart is validated successfully',
      total: totalPrice.toFixed(2),
      cart,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      status: 'Failure',
      message: 'Internal server error',
    })
  }
}

export default validateCart
