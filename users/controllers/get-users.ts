import { Request, Response } from 'express'
import prisma from '../prismaClient'

const getUsers = async (_: Request, res: Response) => {
  try {
    const users = await prisma.users.findMany({
      orderBy: [{ firstName: 'asc' }, { lastName: 'asc' }],
    })

    if (!users || users.length === 0)
      return res.status(404).json({ status: 'Failure', messages: 'No users were found' })

    return res.status(200).json({ status: 'Success', length: users.length, data: users })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ status: 'Failure', message: 'Internal server error' })
  }
}

export default getUsers
