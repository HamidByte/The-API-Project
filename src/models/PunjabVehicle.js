module.exports = (sequelize, DataTypes) => {
  const PunjabVehicle = sequelize.define(
    'PunjabVehicle',
    {
      ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false
      },
      VEH_REG_NO: {
        type: DataTypes.STRING,
        allowNull: true
      },
      REGISTRATION_DATE: {
        type: DataTypes.STRING,
        allowNull: true
      },
      VEH_CHASIS_NO: {
        type: DataTypes.STRING,
        allowNull: true
      },
      VEH_ENGINE_NO: {
        type: DataTypes.STRING,
        allowNull: true
      },
      BODYTYPE: {
        type: DataTypes.STRING,
        allowNull: true
      },
      COLOR: {
        type: DataTypes.STRING,
        allowNull: true
      },
      OWN_NAME: {
        type: DataTypes.STRING,
        allowNull: true
      },
      F_H_NAME: {
        type: DataTypes.STRING,
        allowNull: true
      },
      OWN_NEW_NO: {
        type: DataTypes.STRING,
        allowNull: true
      },
      OWN_STREET: {
        type: DataTypes.STRING,
        allowNull: true
      },
      OWN_CITY: {
        type: DataTypes.STRING,
        allowNull: true
      },
      MAKE_MAKER: {
        type: DataTypes.STRING,
        allowNull: true
      },
      REG_DATE: {
        type: DataTypes.STRING,
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

  return PunjabVehicle
}
