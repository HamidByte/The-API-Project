const express = require('express')

const quoteRoutes = require('./quoteRoutes')
const giphyRoutes = require('./giphyRoutes')
const ocrRoutes = require('./ocrRoutes')

const router = express.Router()

router.use('/v1/quote', quoteRoutes)
router.use('/v1/giphy', giphyRoutes)
router.use('/v1/ocr', ocrRoutes)

module.exports = router
