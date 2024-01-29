const { Sequelize } = require('sequelize')

const getRandomOrder = dialect => {
  if (dialect === 'mysql') {
    return Sequelize.literal('RAND()') // Order by a random row for MySQL
  } else if (dialect === 'postgres') {
    return Sequelize.literal('RANDOM()') // Order by a random row for PostgreSQL
  }
  return null // Add more cases as needed for other dialects
}

module.exports = { getRandomOrder }
