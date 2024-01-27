const express = require('express')
const authRoutes = require('./auth')
const quoteRoutes = require('./quote')

const router = express.Router()

// Define quote routes
router.use('/auth', authRoutes)
router.use('/quote', quoteRoutes)

module.exports = router
