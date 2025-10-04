import { Request, Response } from 'express'
import prisma from '../prismaClient'
import { isValidObjectId } from 'mongoose'

const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    if (!id || !isValidObjectId(id))
      return res.status(400).json({ status: 'Failure', message: 'Invalid or missing id' })

    const user = await prisma.users.findUnique({ where: { id } })

    if (!user) return res.status(404).json({ status: 'Failure', messages: 'No user were found' })

    return res.status(200).json({ status: 'Success', data: user })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ status: 'Failure', message: 'Internal server error' })
  }
}

export default getUserById
