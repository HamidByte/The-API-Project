module.exports = (sequelize, DataTypes) => {
  const Quote = sequelize.define(
    'Quote',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false
      },
      quote: {
        type: DataTypes.STRING,
        allowNull: true
      },
      author: {
        type: DataTypes.STRING,
        allowNull: true
      },
      category: {
        type: DataTypes.STRING,
        allowNull: true
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      }
    },
    {
      timestamps: true // This option adds the createdAt and updatedAt fields
    }
  )

  return Quote
}
