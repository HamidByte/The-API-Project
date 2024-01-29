require('dotenv').config()

module.exports = {
  development: {
    username: '',
    password: '',
    database: '',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres'
  },
  production: {
    DATABASE_URL: process.env.DATABASE_URL,
    dialect: 'postgres'
  }
}
