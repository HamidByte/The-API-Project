const express = require('express')
const verifyApiKey = require('../../middlewares/apiKeyMiddleware')
const verifySubscription = require('../../middlewares/subscriptionMiddleware')
const punjabVehiclesController = require('../../controllers/pakistan/punjabVehiclesController')

const router = express.Router()

router.get('/punjab-vehicles', verifyApiKey, verifySubscription, punjabVehiclesController.getPunjabVehicleByRegistration)

module.exports = router
