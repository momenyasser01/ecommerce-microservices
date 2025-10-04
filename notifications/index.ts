import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { sendEmail } from './utils/emailClient'
import isValidEmail from './utils/isValidEmail'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.post('/send-email', async (req: Request, res: Response) => {
  try {
    const { to, subject, html, text } = req.body

    if (!to || !subject) {
      return res.status(400).json({ status: 'Failure', message: 'to and subject are required' })
    }

    if (Array.isArray(to)) {
      for (const address of to) {
        if (!isValidEmail(address)) {
          return res.status(400).json({ status: 'Failure', message: `Invalid email: ${address}` })
        }
      }
    } else {
      if (!isValidEmail(to)) {
        return res.status(400).json({ status: 'Failure', message: 'Invalid to address' })
      }
    }

    const from = process.env.SEND_EMAIL_FROM! || 'no-reply@momenyasser.com'

    if (!from) return res.status(500).json({ status: 'Failure', message: 'Sender not configured' })

    const result = await sendEmail({ from, to, subject, html, text })

    return res.status(200).json({ status: 'Success', data: result })
  } catch (err: any) {
    console.error('Failed to send via Resend:', err)
    return res
      .status(500)
      .json({ status: 'Failure', message: err.message || 'Internal server error' })
  }
})

const port = process.env.PORT || 5003

app.listen(port, () => {
  console.log(`Orders service running on port ${port}`)
})
