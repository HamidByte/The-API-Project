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
        type: DataTypes.TEXT,
        allowNull: true
      },
      author: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      category: {
        type: DataTypes.TEXT,
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
      // indexes: [
      //   { name: 'index_gin_quote', method: 'GIN', fields: ['quote'] },
      //   { name: 'index_btree_author', fields: ['author'] },
      //   { name: 'index_btree_category', fields: ['category'] }
      // ]
    }
  )

  return Quote
}
