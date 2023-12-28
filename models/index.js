const { Sequelize } = require('sequelize');
const QuoteModel = require('./Quote');

const sequelize = new Sequelize('quotations_hub', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

const models = {
  Quote: QuoteModel(sequelize, Sequelize),
};

module.exports = { sequelize, Sequelize, models };