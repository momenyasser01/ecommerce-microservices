import { Request, Response } from 'express'
import prisma from '../prismaClient'
import { isValidObjectId } from 'mongoose'

const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    if (!id) {
      return res.status(400).json({
        status: 'Failure',
        message: 'Missing id parameter',
      })
    }

    if (!isValidObjectId(id))
      return res.status(400).json({ status: 'Failure', message: 'Invalid product id' })

    const product = await prisma.products.findUnique({ where: { id } })

    if (!product)
      return res
        .status(404)
        .json({ status: 'Failure', message: 'No product with this id were found.' })

    return res.status(200).json({ status: 'Success', data: product })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      status: 'Failure',
      message: 'Internal server error',
    })
  }
}

export default getProductById
