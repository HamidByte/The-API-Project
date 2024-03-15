const { models, Sequelize } = require('../../models')

const getPunjabVehicleByRegistration = async (req, res) => {
  const { regNo } = req.query

  try {
    // Search for the vehicle by registration number
    const vehicle = await models.PunjabVehicle.findOne({
      where: {
        VEH_REG_NO: regNo.toUpperCase()
      }
    })

    if (!vehicle) {
      return res.status(404).json({ found: false, message: 'No vehicle found for the given query' })
    }

    res.json(vehicle)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

module.exports = {
  getPunjabVehicleByRegistration
}
