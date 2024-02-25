const express = require('express')
const verifyToken = require('../middlewares/authMiddleware')
const checkSubscription = require('../middlewares/checkSubscriptionMiddleware')
const giphyController = require('../controllers/giphyController')

const router = express.Router()

// GET /random
router.get('/random', verifyToken, checkSubscription, giphyController.getRandomGiphy)

// GET /search?q=query
router.get('/search', verifyToken, checkSubscription, giphyController.searchQuote)

// GET /:id
router.get('/:id', verifyToken, checkSubscription, giphyController.getGiphyById)

// GET /:gifId
router.get('/gifid/:gifId', verifyToken, checkSubscription, giphyController.getGiphyByGifId)

module.exports = router
