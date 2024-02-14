const express = require('express')
const quoteRoutes = require('./quoteRoutes')
const giphyRoutes = require('./giphyRoutes')

const router = express.Router()

router.use('/v1/quote', quoteRoutes)
router.use('/v1/giphy', giphyRoutes)

module.exports = router
