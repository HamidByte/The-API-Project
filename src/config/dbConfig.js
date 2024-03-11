require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })

let url

url = new URL(process.env.DATABASE_URL)

module.exports = {
  development: {
    username: url?.username,
    password: url?.password,
    database: url?.pathname.substring(1),
    host: url?.hostname,
    port: url?.port || 5432,
    dialect: 'postgres',
    ssl: false
  },
  production: {
    username: url?.username,
    password: url?.password,
    database: url?.pathname.substring(1),
    host: url?.hostname,
    port: url?.port || 5432,
    dialect: 'postgres',
    ssl: true // Set SSL to true for production
  }
}
