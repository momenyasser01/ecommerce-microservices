import { Request, Response } from 'express'
import prisma from '../prismaClient'
import bcrypt from 'bcrypt'
import jwt, { SignOptions } from 'jsonwebtoken'
import isValidEmail from '../utils/isValidEmail'

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    if (!email || !password)
      return res.status(400).json({ status: 'Failure', message: 'Missing required fields' })

    if (!isValidEmail(email))
      return res.status(400).json({ status: 'Failure', message: 'Invalid email format' })

    const user = await prisma.users.findUnique({ where: { email } })

    if (!user)
      return res.status(400).json({ status: 'Failure', message: 'Invalid email or password' })

    if ((await bcrypt.compare(password, user.password)) === false)
      return res.status(400).json({ status: 'Failure', error: 'Invalid email or password' })

    const secret = process.env.JWT_SECRET as string
    const expiresIn = process.env.JWT_EXPIRES_IN as string

    const token = jwt.sign({ id: user.id, role: user.role }, secret, {
      expiresIn,
    } as SignOptions)

    res.cookie('accessToken', token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      domain: process.env.ACCESS_TOKEN_COOKIE_DOMAIN || 'localhost',
      sameSite: 'lax',
    })

    return res.status(200).json({
      status: 'Success',
      message: 'Logged in successfully',
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ status: 'Failure', message: 'Internal server error' })
  }
}

export default login
