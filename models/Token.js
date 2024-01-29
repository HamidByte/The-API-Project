const { v4: uuidv4 } = require('uuid')

module.exports = (sequelize, DataTypes) => {
  const Token = sequelize.define(
    'Token',
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
  Token.beforeCreate(token => {
    token.uuid = uuidv4()
  })

  return Token
}
