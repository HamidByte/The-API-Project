module.exports = (sequelize, DataTypes) => {
  const Giphy = sequelize.define(
    'Giphy',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
      },
      gifId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false
      },
      hash: {
        type: DataTypes.STRING,
        allowNull: false
      },
      fileSize: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      giphyTitle: {
        type: DataTypes.STRING,
        allowNull: false
      },
      importDate: {
        type: DataTypes.DATE,
        allowNull: false
      },
      trendingDate: {
        type: DataTypes.DATE,
        allowNull: false
      }
    },
    {
      timestamps: true // This option adds the createdAt and updatedAt fields
    }
  )

  return Giphy
}
