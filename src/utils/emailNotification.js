const util = require('util')
const nodemailer = require('nodemailer')
const emailConfig = require('../config/emailConfig')
const { baseURLClient } = require('../config/serverConfig')

// Function to send user activation email
const sendActivationEmail = async (email, userActivationCode) => {
  const activationLink = `${baseURLClient}/activate?code=${userActivationCode}`

  const transporter = nodemailer.createTransport(emailConfig.transportOptions)

  const mailOptions = {
    from: `"The API" <${emailConfig.activationEmail.from}>`,
    to: email,
    subject: emailConfig.activationEmail.subject,
    html: emailConfig.activationEmail.html(userActivationCode, activationLink)
  }

  // transporter.sendMail(mailOptions, (error, info) => {
  //   if (error) {
  //     console.error(error)
  //   } else {
  //     // console.log('Email sent: ' + info.response)
  //   }
  // })

  // Convert transporter.sendMail to a promise
  const sendMailPromise = util.promisify(transporter.sendMail).bind(transporter)

  try {
    await sendMailPromise(mailOptions)
  } catch (error) {
    throw new Error('Failed to send activation email.')
  }
}

// Function to send password reset email
const sendResetPasswordEmail = async (email, resetToken) => {
  const resetLink = `${baseURLClient}/reset-password/${resetToken}`

  const transporter = nodemailer.createTransport(emailConfig.transportOptions)

  const mailOptions = {
    from: `"The API" <${emailConfig.resetPassword.from}>`,
    to: email,
    subject: emailConfig.resetPassword.subject,
    text: emailConfig.resetPassword.text(resetLink)
  }

  // Convert transporter.sendMail to a promise
  const sendMailPromise = util.promisify(transporter.sendMail).bind(transporter)

  try {
    await sendMailPromise(mailOptions)
  } catch (error) {
    throw new Error('Failed to send reset password email.')
  }
}

// Function to send activation email to confirm email change
const sendConfirmActivationEmail = async (email, userActivationCode) => {
  const activationLink = `${baseURLClient}/confirm-email?code=${userActivationCode}&email=${email}`

  const transporter = nodemailer.createTransport(emailConfig.transportOptions)

  const mailOptions = {
    from: `"The API" <${emailConfig.confirmEmail.from}>`,
    to: email,
    subject: emailConfig.confirmEmail.subject,
    text: emailConfig.confirmEmail.text(activationLink)
  }

  // Convert transporter.sendMail to a promise
  const sendMailPromise = util.promisify(transporter.sendMail).bind(transporter)

  try {
    await sendMailPromise(mailOptions)
  } catch (error) {
    throw new Error('Failed to send confirm activation email.')
  }
}

module.exports = { sendActivationEmail, sendResetPasswordEmail, sendConfirmActivationEmail }
