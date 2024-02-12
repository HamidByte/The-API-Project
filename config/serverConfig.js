require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })

module.exports = {
  host: process.env.HOST || 'http://localhost',
  port: process.env.PORT || 3000,
  baseURLServer: process.env.BASE_URL_SERVER || 'http://localhost:3000',
  baseURLFrontend: process.env.BASE_URL_FRONTEND
}
