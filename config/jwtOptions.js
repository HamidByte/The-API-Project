require('dotenv').config()

const jwtOptions = {
  secretKey: process.env.SECRET_KEY,
  tokenExpires: '1h',
  algorithm: ['HS256']
}

module.exports = jwtOptions
