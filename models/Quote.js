module.exports = (sequelize, DataTypes) => {
  const Quote = sequelize.define('Quote', {
    quote: {
      type: DataTypes.STRING
    },
    author: {
      type: DataTypes.STRING
    },
    category: {
      type: DataTypes.STRING
    }
  })

  return Quote
}
