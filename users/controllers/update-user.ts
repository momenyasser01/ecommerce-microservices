import { Request, Response } from 'express'
import { isValidObjectId } from 'mongoose'
import prisma from '../prismaClient'
import { Prisma } from '@prisma/client'

const updateUser = async (req: Request, res: Response) => {
  try {
    const { id, firstName, lastName } = req.body

    if (!id || !isValidObjectId(id))
      return res.status(400).json({ status: 'Failure', message: 'missing or invalid id' })

    const data: any = {}

    if (firstName && firstName.length > 1) data.firstName = firstName

    if (lastName && lastName.length > 1) data.lastName = lastName

    const updatedUser = await prisma.users.update({ where: { id }, data })

    return res.status(200).json({
      status: 'Success',
      message: 'User was updated successfully',
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
      },
    })
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

export default updateUser
