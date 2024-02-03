require('dotenv').config()

// configure your email transport options (SMTP, etc.)
module.exports = {
  // host: 'smtp.zoho.eu',
  // port: 465,
  // secure: true, // ssl
  service: 'gmail', // If you are using Gmail, no need to set host or port etc.
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD
  },
  activationEmail: {
    from: process.env.EMAIL_ADDRESS,
    subject: 'Activate Your Account',
    text: activationLink => `Click on the following link to activate your account: ${activationLink}`
  },
  resetPassword: {
    from: process.env.EMAIL_ADDRESS,
    subject: 'Reset Your Password',
    text: resetLink => `Click on the following link to reset your password: ${resetLink}`
  }
}
