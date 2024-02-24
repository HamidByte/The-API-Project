require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })

const jwtOptions = {
  secretKey: process.env.API_SECRET_KEY,
  tokenExpires: 24 * 60 * 60, // 24 hours of expiration
  algorithm: ['HS256']
}

module.exports = jwtOptions
