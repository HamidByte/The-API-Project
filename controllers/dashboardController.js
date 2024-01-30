const { models } = require('../models')
const jwt = require('jsonwebtoken')
const jwtOptions = require('../config/jwtOptions')

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
    res.status(500).json({ error: 'Internal Server Error' })
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
      res.status(404).json({ message: 'API Key not found' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const revokeApiKey = async userId => {
  try {
    // Check if a API key already exists for the user
    const existingApiKey = await findApiKey(userId)

    if (existingApiKey) {
      // API key exists, proceed with deletion
      await models.ApiKey.destroy({ where: { userId } })
    } else {
      // API key doesn't exist, return appropriate response
      res.status(404).json({ message: 'API Key not found' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

module.exports = { generateApiKey, getApiKey, revokeApiKey }
