const { models } = require('../models')
const jwt = require('jsonwebtoken')
const jwtOptions = require('../config/jwtOptions')

const authenticate = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization

  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const token = authorizationHeader.split(' ')[1]

  try {
    // const decodedToken = jwt.verify(token, jwtOptions.secretKey, { algorithms: jwtOptions.algorithm })

    // // Check if the token has expired
    // if (decodedToken.exp <= Math.floor(Date.now() / 1000)) {
    //   return res.status(401).json({ message: 'Token has expired' })
    // }

    const tokenExists = await models.Token.findOne({ where: { token } })

    if (!tokenExists) {
      return res.status(401).json({ message: 'Invalid token' })
    }

    next()
  } catch (error) {
    console.error('Error validating token:', error)
    res.status(500).json({ found: false, message: 'Internal Server Error' })
  }
}

module.exports = authenticate
