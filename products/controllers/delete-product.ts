import { Request, Response } from 'express'
import prisma from '../prismaClient'
import { Prisma } from '@prisma/client'

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    if (!id) return res.status(400).json({ status: 'Failure', message: 'Missing or invalid id' })

    await prisma.products.delete({ where: { id } })

    return res.status(204)
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      // Record not found
      return res.status(404).json({
        status: 'Failure',
        message: 'No product was found with this id',
      })
    }

    console.error(error)
    return res.status(500).json({ status: 'Failure', message: 'Internal server error' })
  }
}

export default deleteProduct
