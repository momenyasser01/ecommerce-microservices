import { Request, Response } from 'express'
import prisma from '../prismaClient'
import crypto from 'crypto'
import bcrypt from 'bcrypt'
import jwt, { SignOptions } from 'jsonwebtoken'
import isValidPassword from '../utils/isValidPassword'
import { Prisma } from '@prisma/client'

const resetPassword = async (req: Request, res: Response) => {
  try {
    const { password } = req.body
    const { resetToken } = req.params

    if (!resetToken || !password)
      return res.status(400).json({ status: 'Failure', message: 'Missing required fields' })

    if (!isValidPassword(password))
      return res.status(400).json({
        status: 'Failure',
        message:
          'Password must be at least 8 characters long, has one special character, and has alphanumeric characters',
      })

    const hashedPassword = await bcrypt.hash(password, 12)

    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    const user = await prisma.users.findFirst({
      where: {
        passwordResetToken: hashedToken,
        passwordResetExpires: { gt: new Date() },
      },
    })

    if (!user)
      return res.status(400).json({
        status: 'failure',
        error: 'Token is invalid or has expired',
      })

    if (await bcrypt.compare(password, user.password))
      return res
        .status(400)
        .json({
          status: 'Failure',
          error:
            "Password must be at least 8 characters long, has one special character, and has alphanumeric characters or error occurred can't change password",
        })

    await prisma.users.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,
        passwordResetToken: null,
        passwordResetExpires: null,
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
      message: 'Password was updated successfully',
    })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025')
      return res.status(404).json({
        status: 'Failure',
        message: 'Error updating user',
      })

    console.error(error)
    return res.status(500).json({ status: 'Failure', message: 'Internal server error' })
  }
}

export default resetPassword
