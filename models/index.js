const { Sequelize } = require('sequelize')
const sequelize = require('../config/database') // Import the database configuration
const UserModel = require('./User')
const SessionModel = require('./Session')
const ApiKeyModel = require('./ApiKey')
const LogModel = require('./Log')
const QuoteModel = require('./Quote')
const GiphyModel = require('./Giphy')

const models = {
  User: UserModel(sequelize, Sequelize),
  Session: SessionModel(sequelize, Sequelize),
  ApiKey: ApiKeyModel(sequelize, Sequelize),
  Log: LogModel(sequelize, Sequelize),
  Quote: QuoteModel(sequelize, Sequelize),
  Giphy: GiphyModel(sequelize, Sequelize)
}

// Establish associations
const { User, Session, ApiKey } = models

// Sessions and Users
User.hasMany(Session, { foreignKey: 'userId', onDelete: 'CASCADE' })
Session.belongsTo(User, { foreignKey: 'userId' })

// ApiKeys and Users
User.hasOne(ApiKey, { foreignKey: 'userId', onDelete: 'CASCADE' })
ApiKey.belongsTo(User, { foreignKey: 'userId' })

module.exports = { sequelize, Sequelize, models }
