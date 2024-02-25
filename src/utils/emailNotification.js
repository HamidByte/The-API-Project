const nodemailer = require('nodemailer')
const emailConfig = require('../config/emailConfig')
const { baseURLClient } = require('../config/serverConfig')

// Function to send activation email
const sendActivationEmail = (email, userActivationCode) => {
  const activationLink = `${baseURLClient}/activate?code=${userActivationCode}`

  const transporter = nodemailer.createTransport(emailConfig.transportOptions)

  const mailOptions = {
    from: `"The API" <${emailConfig.activationEmail.from}>`,
    to: email,
    subject: emailConfig.activationEmail.subject,
    html: emailConfig.activationEmail.html(userActivationCode, activationLink)
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error)
    } else {
      // console.log('Email sent: ' + info.response)
    }
  })
}

// Function to send password reset email
const sendResetPasswordEmail = (email, resetToken) => {
  const resetLink = `${baseURLClient}/reset-password/${resetToken}`

  const transporter = nodemailer.createTransport(emailConfig.transportOptions)

  const mailOptions = {
    from: `"The API" <${emailConfig.resetPassword.from}>`,
    to: email,
    subject: emailConfig.resetPassword.subject,
    text: emailConfig.resetPassword.text(resetLink)
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error)
    } else {
      // console.log('Password reset email sent: ' + info.response)
    }
  })
}

// Function to send activation email to confirm email change
const sendConfirmEmailActivation = (email, userActivationCode) => {
  const activationLink = `${baseURLClient}/confirm-email?code=${userActivationCode}&email=${email}`

  const transporter = nodemailer.createTransport(emailConfig.transportOptions)

  const mailOptions = {
    from: `"The API" <${emailConfig.confirmEmail.from}>`,
    to: email,
    subject: emailConfig.confirmEmail.subject,
    text: emailConfig.confirmEmail.text(activationLink)
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error)
    } else {
      // console.log('Email sent: ' + info.response)
    }
  })
}

module.exports = { sendActivationEmail, sendResetPasswordEmail, sendConfirmEmailActivation }
