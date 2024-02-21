const jwt = require('jsonwebtoken')
const jwtOptions = require('../config/jwtOptions')

function getUserIdFromAuthToken(req) {
  const authorization = req.headers.authorization

  if (!authorization) {
    return null
  }

  if (!authorization.startsWith('Bearer ')) {
    return null
  }

  const token = authorization.split(' ')[1]

  // verify a token symmetric
  try {
    var decodedToken = jwt.verify(token, jwtOptions.secretKey, { algorithms: jwtOptions.algorithm })
  } catch (error) {
    var jwtExpired = error.expiredAt
  }

  // Check if the token has expired
  if (!decodedToken) {
    return null
  }

  return decodedToken?.userId
}

module.exports = { getUserIdFromAuthToken }
