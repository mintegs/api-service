import mailgen from 'mailgen'
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

const mailGenerator = new mailgen({
  theme: 'default',
  product: {
    // Appears in header & footer of e-mails
    name: 'Mintegs',
    link: `https://${process.env.DOMAIN}`,
    // Optional product logo
    // logo: 'https://mailgen.js/img/logo.png'
  },
})

interface DataType {
  intro: string
  action: {
    instructions?: string
    buttonText: string
  }
  data: {
    username: string
    code: string
  }
}

export const authTemplate = ({
  intro,
  action: { instructions = '', buttonText },
  data: { username, code },
}: DataType) => {
  const response = {
    body: {
      name: username,
      intro,
      action: {
        instructions,
        button: {
          color: '#22BC66', // Optional action button color
          text: buttonText,
          link: `https://auth.${process.env.DOMAIN}/verify-identity?code=${code}`,
        },
      },
      // outro:
      //   "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  }

  return mailGenerator.generate(response)
}
