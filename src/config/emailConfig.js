require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })

// configure your email transport options (SMTP, etc.)
module.exports = {
  transportOptions: {
    service: 'gmail', // If you are using Gmail, no need to set host, port or secure. Use application specific password.
    // host: 'smtp.zoho.eu',
    // port: 465,
    // secure: true, // ssl, true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD
    }
    // tls: {
    //   rejectUnauthorized: false
    // }
  },
  activationEmail: {
    from: process.env.EMAIL_ADDRESS,
    subject: 'Activate Your Account',
    // text: activationLink => `Click on the following link to activate your account: ${activationLink}`,
    html: (userActivationCode, activationLink) => `
    <h2 style="background-color: #e6f7ff; padding: 10px; border-radius: 5px; text-align: center;">${userActivationCode}</h2>
    <p style="padding: 20px 0; font-weight: bold; font-size: 16px;">
      Alternatively, click on the following link to activate your account:
      <a href="${activationLink}" target="_blank" style="display: inline-block; padding: 0 10px; color: #007bff; text-decoration: none; font-weight: bold; font-size: 18px;">
        Click here to activate
      </a>
    </p>
    `
  },
  resetPassword: {
    from: process.env.EMAIL_ADDRESS,
    subject: 'Reset Your Password',
    text: resetLink => `Click on the following link to reset your password: ${resetLink}`
  },
  confirmEmail: {
    from: process.env.EMAIL_ADDRESS,
    subject: 'Confirm Your New Email',
    text: resetLink => `Click on the following link to confirm the new email address: ${resetLink}`
  }
}
