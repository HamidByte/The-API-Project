const bcrypt = require('bcrypt')
const { models } = require('../models')

exports.registerUser = async (email, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await models.User.create({
      email,
      password: hashedPassword
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

    if (!user) {
      return null // User not found
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password)

    if (!isPasswordValid) {
      return null // Invalid password
    }

    return user
  } catch (error) {
    throw error
  }
}
