require('dotenv').config()

const jwtOptions = {
  secretKey: process.env.API_SECRET_KEY,
  tokenExpires: 24 * 60 * 60, // 1 hour of expiration
  algorithm: ['HS256']
}

module.exports = jwtOptions
