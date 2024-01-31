const { models } = require('../models')

exports.registerUser = async (email, password) => {
  try {
    const newUser = await models.User.create({
      email,
      password
    })

    return newUser
  } catch (error) {
    throw error
  }
}

exports.loginUser = async (email, password) => {
  try {
    const user = await models.User.findOne({
      where: {
        email
      }
    })

    // User not found
    if (!user) {
      return null
    }

    const isPasswordValid = await user.validPassword(password)

    // Invalid password
    if (!isPasswordValid) {
      return null
    }

    return user
  } catch (error) {
    throw error
  }
}
