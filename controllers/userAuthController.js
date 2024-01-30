const userAuthService = require('../services/userAuthService')

exports.registerUser = async (req, res) => {
  try {
    const { email, password } = req.body

    // Validate input (ensure email uniqueness, password strength, etc.)

    // Register the user
    const newUser = await userAuthService.registerUser(email, password)

    res.json({ uuid: newUser.uuid, email: newUser.email })
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    // Validate input

    // Login the user
    const user = await userAuthService.loginUser(email, password)

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    // Respond with user details or a JWT token if using tokens for authentication
    res.json({ uuid: user.uuid, email: user.email })
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
