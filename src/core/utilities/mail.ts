import nodemailer from 'nodemailer'

export const transporterInstance = () => {
  return nodemailer.createTransport({
    host: 'smtp.gmail.com', // SMTP server address (usually mail.your-domain.com)
    port: 465, // Port for SMTP (usually 465)
    secure: true, // Usually true if connecting to port 465
    auth: {
      user: process.env.EMAIL_USER || '', // Your email address
      pass: process.env.EMAIL_PASSWORD || '', // Password (for gmail, your app password)
    },
  })
}
