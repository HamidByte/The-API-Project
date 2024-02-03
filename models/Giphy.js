module.exports = (sequelize, DataTypes) => {
  const Giphy = sequelize.define(
    'Giphy',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false
      },
      gifId: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true
      },
      url: {
        type: DataTypes.STRING,
        allowNull: true
      },
      hash: {
        type: DataTypes.STRING,
        allowNull: true
      },
      fileSize: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      giphyTitle: {
        type: DataTypes.STRING,
        allowNull: true
      },
      importDate: {
        type: DataTypes.DATE,
        allowNull: true
      },
      trendingDate: {
        type: DataTypes.DATE,
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

  return Giphy
}
