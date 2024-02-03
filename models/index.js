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
const { User, Session, Log, ApiKey } = models

// User Deletion: When a User is deleted, associated Session and ApiKey records will also be deleted. This ensures that all related data for that user, except logs, is removed.
// ApiKey Deletion: When an ApiKey is deleted, the associated User is not affected. However, deletion of a User will delete associated ApiKeys.
// Session Deletion: When a Session is deleted, associated User records will not be deleted. This allows for session cleanup without affecting users.
// Log Deletion: When a Log is deleted, User record will not delete. This allows you to delete log entries without affecting the associated user.

// Users and ApiKeys
User.hasOne(ApiKey, { foreignKey: 'userId' })
ApiKey.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' })

// Users and Sessions
User.hasMany(Session, { foreignKey: 'userId', onDelete: 'CASCADE' })
Session.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' })

// Users and Logs
User.hasMany(Log, { foreignKey: 'userId' })
Log.belongsTo(User, { foreignKey: 'userId' })

module.exports = { sequelize, Sequelize, models }
