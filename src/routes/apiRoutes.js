const express = require('express')

const quoteRoutes = require('./quoteRoutes')
const giphyRoutes = require('./giphyRoutes')
const ocrRoutes = require('./ocrRoutes')
const punjabVehiclesRoutes = require('./pakistan/punjabVehiclesRoutes')
const ROUTES = require('../utils/definitions/routes')

const router = express.Router()

router.use(ROUTES.QUOTES, quoteRoutes)
router.use(ROUTES.GIPHIES, giphyRoutes)
router.use(ROUTES.OCR, ocrRoutes)
router.use(ROUTES.PAKISTAN, punjabVehiclesRoutes)

module.exports = router
