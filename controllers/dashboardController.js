const { Sequelize, models } = require('../models')
const jwt = require('jsonwebtoken')
const jwtOptions = require('../config/jwtOptions')
const { validateUserPassword, validateName, validateUsername } = require('../utils/validation')
const { hashPassword } = require('../utils/hashPassword')

const updateUserProfile = async (userId, updatedData) => {
  try {
    // Fetch the user from the database
    const user = await models.User.findByPk(userId)

    // If the user is not found
    if (!user) {
      return { error: 'User not found', status: 404 }
    }

    // Update user data
    if (updatedData.username) {
      // Validate username
      const isValidUsername = validateUsername(updatedData.username)

      if (isValidUsername.status === 'error') {
        return { error: isValidUsername.message, status: 400 }
      }

      // Check for uniqueness of the new username
      const usernameExists = await models.User.findOne({
        where: { username: updatedData.username, uuid: { [Sequelize.Op.ne]: userId } }
      })

      if (usernameExists) {
        return { error: 'Username already in use', status: 400 }
      }

      user.username = updatedData.username
    }

    if (updatedData.firstName) {
      // Validate user's name
      const isValidFirstName = validateName(updatedData.firstName)

      if (isValidFirstName.status === 'error') {
        return { error: isValidFirstName.message, status: 400 }
      }

      user.firstName = updatedData.firstName
    }

    if (updatedData.lastName) {
      // Validate user's name
      const isValidLastName = validateName(updatedData.lastName)

      if (isValidLastName.status === 'error') {
        return { error: isValidLastName.message, status: 400 }
      }

      user.lastName = updatedData.lastName
    }

    if (updatedData.password) {
      // Validate user password
      const isValidPassword = validateUserPassword(updatedData.password)

      if (isValidPassword.status === 'error') {
        return { error: isValidPassword.message, status: 400 }
      }

      const hashedPassword = await hashPassword(updatedData.password)
      user.password = hashedPassword
    }

    // Save changes to the database
    await user.save()

    return { status: 200 }
  } catch (error) {
    return { error: 'Internal Server Error' }
  }
}

const findApiKey = async userId => {
  const existingApiKey = await models.ApiKey.findOne({ where: { userId: userId } })
  return existingApiKey
}

const generateApiKey = async (tokenExpiration, userId) => {
  try {
    // Check if a API key already exists for the user
    const existingApiKey = await findApiKey(userId)

    // Updating an existing resource would typically use a PUT request, POST can be used for both creation and updating
    if (existingApiKey) {
      // Regenerate the API key and update it with a new value and modify the updatedAt field
      const newToken = jwt.sign({ userId }, jwtOptions.secretKey, {
        expiresIn: tokenExpiration || jwtOptions.tokenExpires
      })

      existingApiKey.token = newToken
      existingApiKey.tokenExpiration = tokenExpiration
      existingApiKey.updatedAt = new Date()
      await existingApiKey.save()

      return existingApiKey
    }

    // If no API key exists, generate a new one and save it to the database with expiration time
    const newToken = jwt.sign({ userId }, jwtOptions.secretKey, {
      expiresIn: tokenExpiration || jwtOptions.tokenExpires
    })

    // Save the API key in the database
    const newApiKey = await models.ApiKey.create({ token: newToken, tokenExpiration: tokenExpiration, userId: userId })

    return newApiKey
  } catch (error) {
    return { error: 'Internal Server Error' }
  }
}

const getApiKey = async userId => {
  try {
    // Check if a API key already exists for the user
    const existingApiKey = await findApiKey(userId)

    if (existingApiKey) {
      return existingApiKey
    } else {
      // API key doesn't exist, display appropriate response
      return { error: 'API Key not found', status: 404 }
    }
  } catch (error) {
    return { error: 'Internal Server Error' }
  }
}

const revokeApiKey = async userId => {
  try {
    // Check if a API key already exists for the user
    const existingApiKey = await findApiKey(userId)

    if (existingApiKey) {
      // API key exists, proceed with deletion
      await models.ApiKey.destroy({ where: { userId } })
      return { message: 'API Key has been successfully deleted' }
    } else {
      // API key doesn't exist, return appropriate response
      return { error: 'API Key not found', status: 404 }
    }
  } catch (error) {
    return { error: 'Internal Server Error' }
  }
}

module.exports = { updateUserProfile, generateApiKey, getApiKey, revokeApiKey }
