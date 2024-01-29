const { v4: uuidv4 } = require('uuid')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true
      },
      firstName: {
        type: DataTypes.STRING
      },
      lastName: {
        type: DataTypes.STRING
      },
      username: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      subscriptionStatus: {
        type: DataTypes.ENUM('free', 'premium'),
        defaultValue: 'free'
      },
      requestCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      lastRequestDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    },
    {
      timestamps: true // This option adds the createdAt and updatedAt fields
    }
  )

  // Generate a UUID before creating a new record
  User.beforeCreate(user => {
    user.uuid = uuidv4()
  })

  return User
}
