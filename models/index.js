const { Sequelize } = require('sequelize');
const QuoteModel = require('./Quote');
const sequelize = require('../config/database'); // Import the database configuration

const models = {
  Quote: QuoteModel(sequelize, Sequelize),
};

module.exports = { sequelize, Sequelize, models };
