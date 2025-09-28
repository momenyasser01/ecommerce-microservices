import { OrderStatus } from '@prisma/client'
import { RequestHandler, Request, Response, NextFunction } from 'express'
import { isValidObjectId } from 'mongoose'

const validateOrderInput: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, products, total, status } = req.body

    if (!id) return res.status(400).json({ status: 'Failure', message: 'Missing required fields' })

    if (!isValidObjectId(id))
      return res.status(400).json({ status: 'Failure', message: 'Invalid order id' })

    if (products && (!total || Number(total) <= 0)) {
      return res.status(400).json({ status: 'Failure', message: 'Invalid or missing total' })
    }

    if (products && !status) {
      let productsTotal = 0
      if (products && (!Array.isArray(products) || products.length === 0))
        return res
          .status(400)
          .json({ status: 'Failure', message: 'Products must be a non-empty array' })

      for (const product of products) {
        if (
          !product.name ||
          typeof product.price !== 'number' ||
          product.price <= 0 ||
          !Number.isInteger(product.quantity) ||
          product.quantity <= 0 ||
          !Number.isInteger(product.weight) ||
          product.weight <= 0 ||
          !product.measurement ||
          !product.image
        ) {
          return res.status(400).json({ status: 'Failure', message: 'Invalid product structure' })
        }

        productsTotal += Number(product.price)
      }

      if (productsTotal !== Number(total))
        return res.status(400).json({
          status: 'Failure',
          message: "The total provided is different than product's real total price",
          total,
          productsTotal,
        })
    }

    if (status && !products) {
      const normalized = status.toString().trim().toUpperCase()

      if (!Object.values(OrderStatus).includes(normalized as OrderStatus)) {
        return res.status(400).json({ status: 'Failure', message: 'Invalid status value' })
      }
    }

    if (products && status)
      return res
        .status(400)
        .json({ status: 'Failure', message: 'Something went wrong or invalid fields' })

    next()
  } catch (error) {
    console.error(error)
    return res.status(500).json({ status: 'Failure', message: 'Internal server error' })
  }
}

export default validateOrderInput
