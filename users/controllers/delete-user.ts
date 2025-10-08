import { Request, Response } from 'express'
import { isValidObjectId } from 'mongoose'
import prisma from '../prismaClient'
import { Prisma } from '@prisma/client'

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    if (!id || !isValidObjectId(id))
      return res.status(400).json({ status: 'Failure', message: 'missing or invalid id' })

    await prisma.users.delete({ where: { id } })

    return res.status(204).json({})
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025')
      return res.status(404).json({
        status: 'Failure',
        message: 'No user was found with this id',
      })

    console.error(error)
    return res.status(500).json({ status: 'Failure', message: 'Internal server error' })
  }
}

export default deleteUser
