const { Sequelize } = require('sequelize')
const sequelize = require('../config/database') // Import the database configuration
const TokenModel = require('./Token')
const QuoteModel = require('./Quote')
const UserModel = require('./User')

const models = {
  Token: TokenModel(sequelize, Sequelize),
  Quote: QuoteModel(sequelize, Sequelize),
  User: UserModel(sequelize, Sequelize)
}

module.exports = { sequelize, Sequelize, models }
