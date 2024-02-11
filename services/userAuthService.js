const { Sequelize, models } = require('../models')

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
      return { status: 'error', message: 'User not found.' }
    }

    const isPasswordValid = await user.validPassword(password)

    // Invalid password
    if (!isPasswordValid) {
      return { status: 'error', message: 'Invalid password' }
    }

    return { status: 'success', user }
  } catch (error) {
    throw error
  }
}

exports.resetPassword = async token => {
  try {
    const user = await models.User.findOne({
      where: {
        resetPasswordToken: token,
        resetPasswordExpiration: { [Sequelize.Op.gte]: new Date() }
      }
    })

    return user
  } catch (error) {
    throw error
  }
}
