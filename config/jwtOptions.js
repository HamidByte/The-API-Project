require('dotenv').config()

const jwtOptions = {
  secretKey: process.env.API_SECRET_KEY,
  tokenExpires: '24h',
  algorithm: ['HS256']
}

module.exports = jwtOptions
