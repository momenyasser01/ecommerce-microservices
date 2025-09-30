import { CreateEmailOptions, Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY || 're_2wEWChDZ_P67GM8werbQt7fTSxiUsC72d')

export async function sendEmail(opts: {
  from: string
  to: string | string[]
  subject: string
  html?: string
  text?: string
}) {
  const { from, to, subject, html, text } = opts

  const { data, error } = await resend.emails.send({
    from,
    to: Array.isArray(to) ? to : [to],
    subject,
    html,
    text,
  } as CreateEmailOptions)

  if (error) {
    throw new Error(JSON.stringify(error))
  }
  return data
}

export default sendEmail
