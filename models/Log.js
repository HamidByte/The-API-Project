module.exports = (sequelize, DataTypes) => {
  const Log = sequelize.define(
    'Log',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: true
      },
      ipAddress: {
        type: DataTypes.STRING,
        allowNull: true
      },
      level: {
        type: DataTypes.STRING,
        allowNull: true
      },
      message: {
        type: DataTypes.STRING,
        allowNull: true
      },
      authorization: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      },
      cookie: {
        type: DataTypes.STRING,
        allowNull: true
      },
      host: {
        type: DataTypes.STRING,
        allowNull: true
      },
      origin: {
        type: DataTypes.STRING,
        allowNull: true
      },
      referer: {
        type: DataTypes.STRING,
        allowNull: true
      },
      userAgentInfo: {
        type: DataTypes.STRING,
        allowNull: true
      },
      isMobile: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      },
      platform: {
        type: DataTypes.STRING,
        allowNull: true
      },
      destination: {
        type: DataTypes.STRING,
        allowNull: true
      },
      mode: {
        type: DataTypes.STRING,
        allowNull: true
      },
      site: {
        type: DataTypes.STRING,
        allowNull: true
      },
      hasUserContext: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      },
      upgradeInsecureRequests: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      },
      userAgent: {
        type: DataTypes.STRING,
        allowNull: true
      },
      httpVersion: {
        type: DataTypes.STRING,
        allowNull: true
      },
      method: {
        type: DataTypes.STRING,
        allowNull: true
      },
      originalUrl: {
        type: DataTypes.STRING,
        allowNull: true
      },
      query: {
        type: DataTypes.STRING,
        allowNull: true
      },
      url: {
        type: DataTypes.STRING,
        allowNull: true
      },
      responseStatusCode: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      responseTime: {
        type: DataTypes.INTEGER,
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

  return Log
}
