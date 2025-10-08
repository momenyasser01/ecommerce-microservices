import { Request, Response } from 'express'
import prisma from '../prismaClient'
import crypto from 'crypto'
import axios from 'axios'
import isValidEmail from '../utils/isValidEmail'
import { Prisma } from '@prisma/client'

const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body

    if (!email)
      return res.status(400).json({ status: 'Failure', message: 'Missing required field' })

    if (!isValidEmail(email))
      return res.status(400).json({ status: 'Failure', message: 'Invalid email address' })

    const user = await prisma.users.findUnique({
      where: {
        email,
      },
    })

    if (!user)
      return res.status(404).json({
        status: 'Failure',
        message: 'User was not found',
      })

    const resetToken = crypto.randomBytes(32).toString('hex')
    const passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    const passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000)

    await prisma.users.update({
      where: {
        email,
      },
      data: {
        passwordResetToken,
        passwordResetExpires,
      },
    })

    const resetURL = `http://localhost:5001/users/reset-password/${resetToken}`
    const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to : ${resetURL}.\nIf you didn't forget your password, Please ignore this email!`

    const emailResponse = await axios.post('http://localhost:5003/send-email', {
      to: email,
      subject: 'Password reset token (valid for 10 min)',
      html: `<p>${message}</p>`,
      text: message,
    })

    if (emailResponse.status !== 200) {
      return res.status(500).json({
        status: 'Failure',
        message: 'Email service responded with an error',
        details: emailResponse.data,
      })
    }

    return res.status(200).json({
      status: 'Success',
      message: 'Reset token was sent by email successfully!',
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

export default forgotPassword
