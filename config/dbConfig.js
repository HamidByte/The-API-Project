require('dotenv').config()

const url = new URL(process.env.DATABASE_URL)

module.exports = {
  development: {
    username: '',
    password: '',
    database: '',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres',
    ssl: false // Set SSL to false for development
  },
  production: {
    username: url.username,
    password: url.password,
    database: url.pathname.substring(1),
    host: url.hostname,
    port: url.port,
    dialect: 'postgres',
    ssl: true
  }
}
