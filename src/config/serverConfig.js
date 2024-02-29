require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })

module.exports = {
  hostName: process.env.HOST || 'localhost',
  portNumber: process.env.PORT || 3000,
  baseURLServer: process.env.BASE_URL_SERVER || 'http://localhost:3000',
  baseURLClient: process.env.BASE_URL_CLIENT
}
