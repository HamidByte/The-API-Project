const express = require('express')
const verifyApiKey = require('../middlewares/apiKeyMiddleware')
const verifySubscription = require('../middlewares/subscriptionMiddleware')
const giphyController = require('../controllers/giphyController')

const router = express.Router()

// GET /random
router.get('/random', verifyApiKey, verifySubscription, giphyController.getRandomGiphy)

// GET /search?q=query
router.get('/search', verifyApiKey, verifySubscription, giphyController.searchQuote)

// GET /:id
router.get('/:id', verifyApiKey, verifySubscription, giphyController.getGiphyById)

// GET /:gifId
router.get('/gifid/:gifId', verifyApiKey, verifySubscription, giphyController.getGiphyByGifId)

module.exports = router
