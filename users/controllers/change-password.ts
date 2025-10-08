import { Request, Response } from 'express'
import prisma from '../prismaClient'
import bcrypt from 'bcrypt'
import jwt, { SignOptions } from 'jsonwebtoken'
import isValidEmail from '../utils/isValidEmail'
import { Prisma } from '@prisma/client'

const changePassword = async (req: Request, res: Response) => {
  try {
    const { email, currentPassword, newPassword, newPasswordConfirm } = req.body

    if (!email || !currentPassword || !newPassword || !newPasswordConfirm)
      return res.status(400).json({
        status: 'Failure',
        error: 'Missing required fields',
      })

    if (!isValidEmail(email))
      return res.status(400).json({ status: 'Failure', message: 'Invalid email address' })

    if (newPassword !== newPasswordConfirm)
      return res.status(400).json({
        status: 'Failure',
        message: 'New password and confirmed new password are not the same',
      })

    const user = await prisma.users.findUnique({
      where: {
        email,
      },
    })

    if (!user)
      return res.status(404).json({
        status: 'Failure',
        error: 'User was not found',
      })

    const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password)

    if (!isPasswordCorrect)
      return res.status(401).json({
        status: 'Failure',
        error: 'Error changing password',
      })

    const hashedPassword = await bcrypt.hash(newPassword, 12)

    await prisma.users.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,
      },
    })

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
      status: 'success',
      message: 'Password was changed successfully',
    })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025')
      return res.status(404).json({
        status: 'Failure',
        message: 'Error updating user',
      })
    console.error(error)
    return res.status(500).json({ status: 'Internal server error' })
  }
}

export default changePassword
