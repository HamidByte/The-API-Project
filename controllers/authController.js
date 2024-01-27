const { models } = require('../models')
const jwt = require('jsonwebtoken')
const jwtOptions = require('../config/jwtOptions')

const findToken = async userId => {
  const existingToken = await models.Token.findOne({ where: { userId } })
  return existingToken
}

const tokenExists = async userId => {
  const existingToken = await findToken(userId)
  return !!existingToken
}

const generateToken = async (tokenExpiration, userId) => {
  // Check if a token already exists for the user
  const existingToken = await findToken(userId)

  if (existingToken) {
    return existingToken.token
  }

  // Generate a new token and save it to the database with expiration time
  const token = jwt.sign({ userId }, jwtOptions.secretKey, {
    expiresIn: tokenExpiration || jwtOptions.tokenExpires
  })

  await models.Token.create({ token, tokenExpiration, userId })
  return token
}

const regenerateToken = async (tokenExpiration, userId) => {
  // Check if a token already exists for the user
  const existingToken = await findToken(userId)

  if (existingToken) {
    // Update the token with a new value and only modify the updatedAt field
    const newToken = jwt.sign({ userId }, jwtOptions.secretKey, {
      expiresIn: tokenExpiration || jwtOptions.tokenExpires
    })

    existingToken.token = newToken
    existingToken.tokenExpiration = tokenExpiration
    existingToken.updatedAt = new Date()
    await existingToken.save()

    return newToken
  }

  // If no token exists, generate a new one
  return generateToken(userId)
}

const deleteToken = async userId => {
  // Check if a token already exists for the user
  const existingToken = await findToken(userId)

  if (existingToken) {
    // Token exists, proceed with deletion
    await models.Token.destroy({ where: { userId } })
  }
  // Token doesn't exist, do nothing
}

module.exports = { tokenExists, generateToken, regenerateToken, deleteToken }
