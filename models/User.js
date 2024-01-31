const { v4: uuidv4 } = require('uuid')
const bcrypt = require('bcrypt')

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
        allowNull: false,
        unique: true
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

  // User.associate = models => {
  //   User.hasOne(models.ApiKey, {
  //     foreignKey: 'userId'
  //   })
  // }

  // Generate a UUID before creating a new record
  User.beforeCreate(async user => {
    user.uuid = uuidv4()

    // Hash the password before storing it in the database
    user.password = await bcrypt.hash(user.password, 10) // 10 is the number of salt rounds
  })

  // Method to check if the provided password matches the hashed password in the database
  User.prototype.validPassword = async function (password) {
    return bcrypt.compare(password, this.password)
  }

  return User
}
