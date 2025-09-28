// import nodemailer, { Transporter } from 'nodemailer'

// let transporter: Transporter | null = null

// export function getTransporter(): Transporter {
//   if (transporter) {
//     return transporter
//   }

//   // configure transporter once
//   transporter = nodemailer.createTransport({
//     host: process.env.SMTP_HOST,
//     port: Number(process.env.SMTP_PORT || 587),
//     secure: process.env.SMTP_SECURE === 'true', // true if port 465
//     auth: {
//       user: process.env.SMTP_USER,
//       pass: process.env.SMTP_PASS,
//     },
//   })

//   // Optionally verify connection immediately
//   transporter.verify((err, success) => {
//     if (err) {
//       console.error('Error verifying email transporter:', err)
//     } else {
//       console.log('Email transporter ready:', success)
//     }
//   })

//   return transporter
// }
