const { Sequelize } = require('sequelize')
const sequelize = require('../config/database') // Import the database configuration
const ApiKeyModel = require('./ApiKey')
const QuoteModel = require('./Quote')
const UserModel = require('./User')

const models = {
  ApiKey: ApiKeyModel(sequelize, Sequelize),
  Quote: QuoteModel(sequelize, Sequelize),
  User: UserModel(sequelize, Sequelize)
}

module.exports = { sequelize, Sequelize, models }
