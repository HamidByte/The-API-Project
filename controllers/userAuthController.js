const validator = require('validator')
const userAuthService = require('../services/userAuthService')
const { Sequelize, models } = require('../models')

// Check password strength
const isStrongPassword = password => {
  // Check if the password is at least 8 characters long and contains at least one letter and one number
  return /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(password)
}

exports.registerUser = async (req, res) => {
  try {
    const { email, password } = req.body

    // Validate input
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: 'Invalid email address' })
    }

    // Additional validation for email and password (you can customize this)
    // For example, check for spaces, hacking characters, etc.

    // Password strength check
    if (!isStrongPassword(password)) {
      return res.status(400).json({ error: 'Password must be at least 8 characters long and include both letters and numbers' })
    }

    // Register the user
    const newUser = await userAuthService.registerUser(email, password)

    res.json({ uuid: newUser.uuid, email: newUser.email })
  } catch (error) {
    if (error instanceof Sequelize.UniqueConstraintError) {
      // Unique constraint violation (email already exists)
      const errorMessage = error.errors[0].message
      return res.status(400).json({ error: errorMessage })
    } else {
      return res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    // Validate input
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: 'Invalid email address' })
    }

    // Password strength check
    if (!isStrongPassword(password)) {
      return res.status(400).json({ error: 'Invalid password' })
    }

    // Login the user
    const user = await userAuthService.loginUser(email, password)

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    // Store user information in the session
    req.session.user = {
      userId: user.uuid,
      email: user.email
    }

    // Explicitly set userId in the Session model and Save the session with userId
    const session = await models.Session.findOne({
      where: { sid: req.sessionID }
    })

    if (session) {
      session.userId = user.uuid
      await session.save()
    }

    // Respond with user details or a JWT token if using tokens for authentication
    res.json({ uuid: user.uuid, email: user.email })
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
