module.exports = (sequelize, DataTypes) => {
  const Log = sequelize.define(
    'Log',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
      },
      requestUrl: {
        type: DataTypes.STRING
      },
      ipAddress: {
        type: DataTypes.STRING
      },
      userAgent: {
        type: DataTypes.TEXT
      }
    },
    {
      timestamps: true // This option adds the createdAt and updatedAt fields
    }
  )

  return Log
}
