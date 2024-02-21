const { Sequelize } = require('sequelize')
const config = require('./dbConfig')

const environment = process.env.NODE_ENV || 'development'
const dbConfig = config[environment]

let sequelize

sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  ssl: dbConfig.ssl // This line is important for self-signed certificates
})

module.exports = sequelize
