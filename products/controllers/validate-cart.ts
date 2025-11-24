import { Request, Response } from 'express'
import prisma from '../prismaClient'

const validateCart = async (req: Request, res: Response) => {
  try {
    const { cart } = req.body

    let totalPrice = 0

    if (!cart) return res.status(400).json({ status: 'Failure', message: 'Missing required field' })

    for (const cartProduct of cart) {
      if (!cartProduct.quantity)
        return res
          .status(400)
          .json({ status: 'Failure', message: 'Missing required field quantity' })

      if (!Number.isInteger(cartProduct.quantity) || cartProduct.quantity <= 0) {
        return res.status(400).json({
          status: 'failure',
          message: 'Quantity must be a positive integer',
        })
      }

      if (cartProduct.price <= 0) {
        return res.status(400).json({
          status: 'failure',
          message: 'Invalid fields',
        })
      }

      const product = await prisma.products.findUnique({ where: { id: cartProduct.id } })

      if (!product)
        return res
          .status(404)
          .json({ status: 'Failure', message: 'Product was not found in the database' })

      if (product.stock === 0)
        return res
          .status(400)
          .json({ status: 'Failure', message: 'Product is out of stock', product })

      if (product.stock < cartProduct.quantity)
        return res.status(400).json({
          status: 'Failure',
          message: 'Not enough stock of the product to complete the purchase',
          product,
        })

      totalPrice += product.price * cartProduct.quantity
    }

    return res.status(200).json({
      status: 'Success',
      message: 'Cart is validated successfully',
      total: totalPrice.toFixed(2),
      cart,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ status: 'Failure', message: 'Internal server error' })
  }
}

export default validateCart
