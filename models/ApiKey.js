const { v4: uuidv4 } = require('uuid')

module.exports = (sequelize, DataTypes) => {
  const ApiKey = sequelize.define(
    'ApiKey',
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false
      },
      tokenExpiration: {
        type: DataTypes.STRING,
        allowNull: false
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true
      }
    },
    {
      timestamps: true // This option adds the createdAt and updatedAt fields
    }
  )

  // Generate a UUID before creating a new record
  ApiKey.beforeCreate(token => {
    token.uuid = uuidv4()
  })

  // ApiKey.associate = models => {
  //   ApiKey.belongsTo(models.User, {
  //     foreignKey: 'userId',
  //     onDelete: 'CASCADE'
  //   })
  // }

  return ApiKey
}