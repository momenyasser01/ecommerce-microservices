import { Request, Response } from 'express'
import prisma from '../prismaClient'
import isValidEmail from '../utils/isValidEmail'
import bcrypt from 'bcrypt'
import jwt, { SignOptions } from 'jsonwebtoken'
import isValidPassword from '../utils/isValidPassword'
import isValidPhoneNumber from '../utils/isValidPhoneNumber'

const signup = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, phoneNumber, password } = req.body

    if (!firstName || !lastName || !email || !phoneNumber || !password)
      return res.status(400).json({ status: 'failure', message: 'Missing required fields' })

    if (!isValidEmail(email))
      return res.status(400).json({ status: 'Failure', message: 'Invalid email format' })

    if (!isValidPassword(password))
      return res.status(400).json({
        status: 'Failure',
        message:
          'Password must be at least 8 characters long, has one special character, and has alphanumeric characters',
      })

    if (!isValidPhoneNumber(phoneNumber))
      return res.status(400).json({ status: 'Failure', message: 'Invalid phone number' })

    const user = await prisma.users.findUnique({ where: { email } })

    if (user) return res.status(400).json({ status: 'Failure', message: 'Error creating a user' })

    const hashedPassword = await bcrypt.hash(password, 12)

    const createdUser = await prisma.users.create({
      data: { firstName, lastName, email, phoneNumber, password: hashedPassword },
    })

    const secret = process.env.JWT_SECRET as string
    const expiresIn = process.env.JWT_EXPIRES_IN as string

    const token = jwt.sign({ id: createdUser.id, role: createdUser.role }, secret, {
      expiresIn,
    } as SignOptions)

    res.cookie('accessToken', token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      domain: process.env.ACCESS_TOKEN_COOKIE_DOMAIN || 'localhost',
      sameSite: 'lax',
    })

    return res
      .status(201)
      .json({ status: 'Success', message: 'User has been created successfully' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ status: 'Failure', message: 'Internal server error' })
  }
}

export default signup
