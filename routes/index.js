const express = require('express')

const quoteRoutes = require('./quoteRoutes')

const router = express.Router()

// Define quote routes
router.use('/v1/quote', quoteRoutes)

module.exports = router
