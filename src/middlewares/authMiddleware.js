const { models } = require('../models')
const jwt = require('jsonwebtoken')
const jwtOptions = require('../config/jwtOptions')

const handleServerError = (res, error, operation) => {
  const errorMessage = `${operation}: ${error.message}`

  if (process.env.NODE_ENV === 'development') {
    console.error(errorMessage, error)
    res.status(500).json({ error: 'Internal Server Error', message: errorMessage })
  } else {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

// Authenticate
const verifyToken = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization

    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized: Missing or invalid authentication token' })
    }

    const token = authorizationHeader.split(' ')[1]

    // verify a token symmetric
    try {
      var decodedToken = jwt.verify(token, jwtOptions.secretKey, { algorithms: jwtOptions.algorithm })
    } catch (error) {
      var jwtExpired = error.expiredAt
    }

    // Check if the token has expired
    if (!decodedToken) {
      return res.status(401).json({ error: 'Your API key is either invalid or has expired, please generate a new API key.' })
    }

    // Check if the token has expired
    if (decodedToken.exp <= Math.floor(Date.now() / 1000)) {
      return res.status(401).json({ error: 'API key has expired' })
    }

    // Validate API key from database (if user generates new API key, old API key should not work)
    const apiKeyExist = await models.ApiKey.findOne({
      where: {
        userId: decodedToken.userId
      }
    })

    if (apiKeyExist.token !== token) {
      return res.status(401).json({ error: 'Invalid API key, please generate a new API key.' })
    }

    // Attach userId to the request for further processing
    req.userId = decodedToken.userId

    next()
  } catch (error) {
    handleServerError(res, error, 'Error during validating token')
  }
}

module.exports = verifyToken
