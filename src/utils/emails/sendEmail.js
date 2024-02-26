const util = require('util')
const nodemailer = require('nodemailer')
const emailConfig = require('../../config/emailConfig')
const emailSettings = require('./emailSettings')
const { generateUserActivationEmailHTML, generatePasswordResetEmailHTML, generateChangeEmailHTML } = require('../../templates/emailTemplates')
const { baseURLClient } = require('../../config/serverConfig')

// Send user activation email and resend activation email
const sendUserActivationEmail = async (email, userActivationCode) => {
  const userActivationLink = `${baseURLClient}/activate?code=${userActivationCode}`
  const htmlContent = generateUserActivationEmailHTML(email, userActivationCode, userActivationLink)

  const transporter = nodemailer.createTransport(emailConfig.transportOptions)

  const mailOptions = {
    from: `"The API" <${emailSettings.userActivation.from}>`,
    to: email,
    subject: emailSettings.userActivation.subject,
    // text: emailSettings.userActivation.text(userActivationLink),
    html: emailSettings.userActivation.html(htmlContent)
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

// Send password reset email
const sendResetPasswordEmail = async (email, resetToken) => {
  const resetPasswordLink = `${baseURLClient}/reset-password/${resetToken}`
  const htmlContent = generatePasswordResetEmailHTML(email, resetPasswordLink)

  const transporter = nodemailer.createTransport(emailConfig.transportOptions)

  const mailOptions = {
    from: `"The API" <${emailSettings.resetPassword.from}>`,
    to: email,
    subject: emailSettings.resetPassword.subject,
    // text: emailSettings.resetPassword.text(resetPasswordLink)
    html: emailSettings.resetPassword.html(htmlContent)
  }

  // Convert transporter.sendMail to a promise
  const sendMailPromise = util.promisify(transporter.sendMail).bind(transporter)

  try {
    await sendMailPromise(mailOptions)
  } catch (error) {
    throw new Error('Failed to send reset password email.')
  }
}

// Send activation email to confirm email change
const sendChangeEmailConfirmActivationEmail = async (oldEmail, newEmail, changeEmailToken) => {
  const changeEmailLink = `${baseURLClient}/confirm-email/${changeEmailToken}`
  const htmlContent = generateChangeEmailHTML(oldEmail, changeEmailToken, changeEmailLink)

  const transporter = nodemailer.createTransport(emailConfig.transportOptions)

  const mailOptions = {
    from: `"The API" <${emailSettings.changeEmail.from}>`,
    to: oldEmail,
    subject: emailSettings.changeEmail.subject,
    // text: emailSettings.changeEmail.text(changeEmailLink),
    html: emailSettings.changeEmail.html(htmlContent)
  }

  // Convert transporter.sendMail to a promise
  const sendMailPromise = util.promisify(transporter.sendMail).bind(transporter)

  try {
    await sendMailPromise(mailOptions)
  } catch (error) {
    throw new Error('Failed to send confirm change email activation link.')
  }
}

module.exports = { sendUserActivationEmail, sendResetPasswordEmail, sendChangeEmailConfirmActivationEmail }
