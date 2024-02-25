const { Sequelize, models } = require('../models')
const { generateVerificationCode } = require('../utils/uniqueIdentifiers')
const { sendActivationEmail } = require('../utils/emailNotification')
const { validateUserEmail } = require('../utils/validation')
const userConfig = require('../config/userConfig')

exports.activateUser = async (req, res) => {
  try {
    const userId = req.session?.user?.userId
    const { code } = req.query

    if (!code) {
      return res.status(400).json({ error: 'Code is required.' })
    }

    const user = await models.User.findOne({
      where: {
        uuid: userId,
        userActivationCode: code.toUpperCase(),
        userActivationExpiration: { [Sequelize.Op.gte]: new Date() }
      }
    })

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired code.' })
    }

    // Activate the user
    user.isConfirmed = true
    user.userActivationCode = null
    user.userActivationExpiration = null
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

    if (user.isConfirmed) {
      return res.status(400).json({ error: 'User is already activated' })
    }

    // Generate new verification code and send email
    const newVerificationCode = generateVerificationCode()
    user.userActivationCode = newVerificationCode
    user.userActivationExpiration = userConfig.resendActivationExpiration
    await user.save()

    await sendActivationEmail(email, newVerificationCode)

    res.json({ message: 'Activation link resent successfully. Please check your email for activation.' })
  } catch (error) {
    res.status(500).json({ error: error.message || 'Internal Server Error' })
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

    res.json({ uuid: user.uuid, firstName: user.firstName, lastName: user.lastName, username: user.username, email: user.email, role: user.role, subscriptionStatus: user.subscriptionStatus, requestCount: user.requestCount, creditCount: user.creditCount, lastRequestDate: user.lastRequestDate, isConfirmed: user.isConfirmed, createdAt: user.createdAt, updatedAt: user.updatedAt })
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

exports.isUserActive = async (req, res) => {
  try {
    const userId = req.session?.user?.userId

    // Check if the authenticated user is trying to get user
    if (!userId) {
      return res.status(403).json({ error: 'Forbidden: You are not allowed to get user activation status.' })
    }

    const user = await models.User.findOne({
      where: {
        uuid: userId
      }
    })

    if (!user) {
      return res.status(400).json({ error: 'User not found' })
    }

    // Check if the user is activated
    if (user.isConfirmed) {
      return res.json({ isConfirmed: true, message: 'User is activated' })
    } else {
      return res.json({ isConfirmed: false, message: 'User is not activated' })
    }
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
