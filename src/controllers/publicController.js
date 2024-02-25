const { Sequelize, models } = require('../models')
const userService = require('../services/userService')
const { generateVerificationCode, generateCryptoUUID } = require('../utils/uniqueIdentifiers')
const { updateSession } = require('../utils/updateSession')
const { sendActivationEmail, sendResetPasswordEmail } = require('../utils/emailNotification')
const { validateUserEmail, validateUserPassword } = require('../utils/validation')
const { hashPassword } = require('../utils/hashPassword')
const userConfig = require('../config/userConfig')

exports.registerUser = async (req, res) => {
  try {
    const { email, password } = req.body

    // Validate user email
    const isEmailValid = validateUserEmail(email)

    if (isEmailValid.status === 'error') {
      return res.status(400).json({ error: isEmailValid.message })
    }

    // Validate user password
    const isPasswordValid = validateUserPassword(password)

    if (isPasswordValid.status === 'error') {
      return res.status(400).json({ error: isPasswordValid.message })
    }

    // Register the user
    const newUser = await userService.registerUser(email, password)

    // Generate verification code and send activation email
    const userActivationCode = generateVerificationCode()
    newUser.userActivationCode = userActivationCode
    newUser.userActivationExpiration = userConfig.userActivationExpiration
    await newUser.save()

    await sendActivationEmail(email, userActivationCode)

    // Update session
    await updateSession(req, newUser)

    res.json({ uuid: newUser.uuid, message: 'User registered successfully. Please check your email for activation.' })
  } catch (error) {
    if (error instanceof Sequelize.UniqueConstraintError) {
      // Unique constraint violation (email already exists)
      // const errorMessage = error.errors[0].message
      const errorMessage = 'Email is already registered. Please use a different email.'
      return res.status(400).json({ error: errorMessage })
    } else {
      return res.status(500).json({ error: error.message || 'Internal Server Error' })
    }
  }
}

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    // Validate user email
    const isEmailValid = validateUserEmail(email)

    if (isEmailValid.status === 'error') {
      return res.status(400).json({ error: isEmailValid.message })
    }

    // Validate user password
    const isPasswordValid = validateUserPassword(password)

    if (isPasswordValid.status === 'error') {
      return res.status(400).json({ error: isPasswordValid.message })
    }

    // Login the user
    const result = await userService.loginUser(email, password)

    if (result.status === 'success') {
      const user = result.user
      // Update session
      await updateSession(req, user)

      res.json({ uuid: user.uuid, firstName: user.firstName, lastName: user.lastName, username: user.username, email: user.email, role: user.role, subscriptionStatus: user.subscriptionStatus, requestCount: user.requestCount, creditCount: user.creditCount, lastRequestDate: user.lastRequestDate, isConfirmed: user.isConfirmed, createdAt: user.createdAt, updatedAt: user.updatedAt })
    } else {
      // Respond with appropriate error message
      res.status(401).json({ error: result.message })
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

exports.forgetPassword = async (req, res) => {
  try {
    const { email } = req.body

    // Validate user email
    const isEmailValid = validateUserEmail(email)

    if (isEmailValid.status === 'error') {
      return res.status(400).json({ error: isEmailValid.message })
    }

    const user = await models.User.findOne({
      where: {
        email
      }
    })

    if (!user) {
      return res.status(400).json({ error: 'User not found' })
    }

    // Generate a unique verification code for password reset)
    const resetToken = generateCryptoUUID()
    const resetExpiration = userConfig.resetPasswordExpiration

    // Store the code and expiration in the user's record
    user.resetPasswordToken = resetToken
    user.resetPasswordExpiration = resetExpiration
    await user.save()

    // Send a password reset email with the code
    await sendResetPasswordEmail(email, resetToken)

    res.json({ message: 'Password reset email sent successfully.' })
  } catch (error) {
    res.status(500).json({ error: error.message || 'Internal Server Error' })
  }
}

exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params
    const { password } = req.body

    // Validate user password
    const isPasswordValid = validateUserPassword(password)

    if (isPasswordValid.status === 'error') {
      return res.status(400).json({ error: isPasswordValid.message })
    }

    // Validate verification code and get user
    const user = await userService.resetPassword(token)

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired token.' })
    }

    // Update the user's password and reset token
    user.password = await hashPassword(password)
    user.resetPasswordToken = null
    user.resetPasswordExpiration = null
    await user.save()

    res.json({ message: 'Password reset successful.' })
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
