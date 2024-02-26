require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })

// Configure your email transport options (SMTP, etc.)
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
  }
}
