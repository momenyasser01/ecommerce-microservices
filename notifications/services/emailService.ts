// import { getTransporter } from './emailClient'

// interface MailOptions {
//   to: string
//   subject: string
//   html?: string
//   text?: string
//   // you can add attachments etc. later
// }

// export async function sendEmail(options: MailOptions) {
//   const transporter = getTransporter()

//   try {
//     const info = await transporter.sendMail({
//       from: process.env.SMTP_FROM, // e.g. '"MyApp" <no-reply@myapp.com>'
//       to: options.to,
//       subject: options.subject,
//       text: options.text,
//       html: options.html,
//     })

//     console.log('Email sent:', info.messageId)
//     return info
//   } catch (err) {
//     console.error('Failed to send email:', err)
//     throw err // or handle it gracefully
//   }
// }
