import { Request, Response } from 'express'
import prisma from '../prismaClient'

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { products } = req.body

    if (!products)
      return res.status(400).json({ status: 'failure', message: 'Missing required field' })

    for (const product of products) {
      if (!Number.isInteger(product.quantity) || product.quantity <= 0) {
        return res.status(400).json({
          status: 'failure',
          message: 'Quantity must be a positive integer',
        })
      }

      const searchedProduct = await prisma.products.findUnique({ where: { id: product.id } })

      if (!searchedProduct)
        return res
          .status(404)
          .json({ status: 'Failure', message: `Product was not found in the database` })

      if (searchedProduct?.quantity - product.quantity <= 0)
        await prisma.products.update({ where: { id: product.id }, data: { quantity: 0 } })
      else {
        await prisma.products.update({
          where: { id: product.id },
          data: { quantity: searchedProduct.quantity - product.quantity },
        })
      }
    }

    return res.status(200).json({ status: 'Success', message: 'Products updated' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ status: 'Failure', message: 'Internal server error' })
  }
}

export default updateProduct
