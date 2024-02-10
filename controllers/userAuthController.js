const { v4: uuidv4 } = require('uuid')
const userAuthService = require('../services/userAuthService')
const { Sequelize, models } = require('../models')
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
    const newUser = await userAuthService.registerUser(email, password)

    // Generate activation token and send activation email
    const activateToken = uuidv4()
    const activateTokenExpiration = userConfig.activateTokenExpiration
    newUser.activateToken = activateToken
    newUser.activateTokenExpiration = activateTokenExpiration
    await newUser.save()

    sendActivationEmail(email, activateToken)

    // Update session
    await updateSession(req, newUser)

    res.json({ message: 'User registered successfully. Please check your email for activation.' })
  } catch (error) {
    if (error instanceof Sequelize.UniqueConstraintError) {
      // Unique constraint violation (email already exists)
      // const errorMessage = error.errors[0].message
      const errorMessage = 'Email is already registered. Please use a different email.'
      return res.status(400).json({ error: errorMessage })
    } else {
      return res.status(500).json({ error: 'Internal Server Error' })
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
    const result = await userAuthService.loginUser(email, password)

    if (result.status === 'success') {
      const user = result.user
      // Update session
      await updateSession(req, user)

      res.json({ uuid: user.uuid, firstName: user.firstName, lastName: user.lastName, username: user.username, email: user.email, subscriptionStatus: user.subscriptionStatus, requestCount: user.requestCount, lastRequestDate: user.lastRequestDate, isActive: user.isActive, createdAt: user.createdAt, updatedAt: user.updatedAt })
    } else {
      // Respond with appropriate error message
      res.status(401).json({ error: result.message })
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

exports.activateUser = async (req, res) => {
  try {
    const { token } = req.query

    const user = await models.User.findOne({
      where: {
        activateToken: token,
        activateTokenExpiration: { [Sequelize.Op.gte]: new Date() }
      }
    })

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired token.' })
    }

    // Activate the user
    user.isActive = true
    user.activateToken = null
    user.activateTokenExpiration = null
    user.updatedAt = new Date()
    await user.save()

    res.json({ message: 'User activated successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

exports.resendActivation = async (req, res) => {
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

    if (user.isActive) {
      return res.status(400).json({ error: 'User is already activated' })
    }

    // Generate new token and send email
    const newToken = uuidv4()
    user.activateToken = newToken
    user.activateTokenExpiration = userConfig.resendActivationExpiration
    await user.save()

    sendActivationEmail(email, newToken)

    res.json({ message: 'Activation link resent successfully. Please check your email for activation.' })
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

    // Generate a unique token for password reset
    const resetToken = uuidv4()
    const resetExpiration = userConfig.resetPasswordExpiration

    // Store the token and expiration in the user's record
    user.resetPasswordToken = resetToken
    user.resetPasswordExpiration = resetExpiration
    await user.save()

    // Send a password reset email with the token
    sendResetPasswordEmail(email, resetToken)

    res.json({ message: 'Password reset email sent successfully.' })
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
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

    // Validate token and get user
    const user = await userAuthService.resetPassword(token)

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

exports.getUser = async (req, res) => {
  try {
    const userId = req.session?.user?.userId

    // Check if the authenticated user is trying to get user
    if (!userId) {
      return res.status(403).json({ error: 'Forbidden: You are not allowed to get user information.' })
    }

    const user = await models.User.findOne({
      where: {
        uuid: userId
      }
    })

    if (!user) {
      return res.status(400).json({ error: 'User not found' })
    }

    res.json({ uuid: user.uuid, firstName: user.firstName, lastName: user.lastName, username: user.username, email: user.email, subscriptionStatus: user.subscriptionStatus, requestCount: user.requestCount, lastRequestDate: user.lastRequestDate, isActive: user.isActive, createdAt: user.createdAt, updatedAt: user.updatedAt })
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.session?.user?.userId

    // Check if the authenticated user is trying to delete their own account
    if (!userId) {
      return res.status(403).json({ error: 'Forbidden: You are not allowed to delete this user.' })
    }

    // Delete the user
    await models.User.destroy({
      where: {
        uuid: userId
      }
    })

    // Optionally, you can add logic to clean up associated data (e.g., sessions, logs, etc.)

    res.json({ message: 'User deleted successfully.' })
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
