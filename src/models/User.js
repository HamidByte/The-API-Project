const bcrypt = require('bcrypt')
const { generateRandomUUID } = require('../utils/uniqueIdentifiers')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        allowNull: false
      },
      // deletedAt: {
      //   type: DataTypes.DATE,
      //   defaultValue: null,
      //   allowNull: true
      // },
      firstName: {
        type: DataTypes.STRING,
        allowNull: true
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      role: {
        type: DataTypes.ENUM('user', 'admin'),
        defaultValue: 'user',
        allowNull: false
      },
      subscriptionStatus: {
        type: DataTypes.ENUM('free', 'premium'),
        defaultValue: 'free',
        allowNull: false
      },
      requestCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
      },
      creditCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
      },
      lastRequestDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
      },
      resetPasswordToken: {
        type: DataTypes.UUID,
        unique: true,
        defaultValue: null,
        allowNull: true
      },
      resetPasswordExpiration: {
        type: DataTypes.DATE,
        defaultValue: null,
        allowNull: true
      },
      changeEmailToken: {
        type: DataTypes.UUID,
        unique: true,
        defaultValue: null,
        allowNull: true
      },
      changeEmailExpiration: {
        type: DataTypes.DATE,
        defaultValue: null,
        allowNull: true
      },
      userActivationCode: {
        type: DataTypes.STRING,
        defaultValue: null,
        unique: true,
        allowNull: true
      },
      userActivationExpiration: {
        type: DataTypes.DATE,
        defaultValue: null,
        allowNull: true
      },
      isConfirmed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
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
      // paranoid: true // Enable soft deletes, add the deletedAt field for soft deletes
    }
  )

  // User.associate = models => {
  //   User.hasOne(models.ApiKey, {
  //     foreignKey: 'userId'
  //   })
  // }

  User.beforeCreate(async user => {
    // Generate a UUID before creating a new record
    user.uuid = generateRandomUUID()

    // Hash the password before storing it in the database
    user.password = await bcrypt.hash(user.password, 10) // 10 is the number of salt rounds
  })

  // Method to check if the provided password matches the hashed password in the database
  User.prototype.validPassword = async function (password) {
    return bcrypt.compare(password, this.password)
  }

  return User
}
