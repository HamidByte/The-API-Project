module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define(
    'Session',
    {
      sid: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
        allowNull: false
      },
      expires: {
        type: DataTypes.DATE,
        allowNull: false
      },
      data: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      userId: {
        type: DataTypes.UUID,
        defaultValue: null,
        allowNull: true
        // references: {
        //   model: 'User',
        //   key: 'uuid'
        // }
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

  return Session
}
