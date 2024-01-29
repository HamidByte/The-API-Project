const { Sequelize } = require('sequelize')
const config = require('./dbConfig')

const environment = process.env.NODE_ENV || 'development'
const dbConfig = config[environment]

let sequelize

if (process.env.NODE_ENV === 'production') {
  sequelize = new Sequelize(dbConfig.DATABASE_URL, {
    dialect: dbConfig.dialect,
    ssl: {
      rejectUnauthorized: false // This line is important for self-signed certificates
    }
  })
} else {
  sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect
  })
}

module.exports = sequelize
