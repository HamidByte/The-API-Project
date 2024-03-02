const express = require('express')
const verifyApiKey = require('../middlewares/apiKeyMiddleware')
const verifySubscription = require('../middlewares/subscriptionMiddleware')
const quoteController = require('../controllers/quoteController')

const router = express.Router()

// GET /random
router.get('/random', verifyApiKey, verifySubscription, quoteController.getRandomQuote)

// GET /search?q=query
router.get('/search', verifyApiKey, verifySubscription, quoteController.searchQuote)

// GET /:id
router.get('/:id', verifyApiKey, verifySubscription, quoteController.getQuoteById)

// GET /category/:category
router.get('/category/:category', verifyApiKey, verifySubscription, quoteController.getQuoteByCategory)

// GET /author/:author
router.get('/author/:author', verifyApiKey, verifySubscription, quoteController.getQuoteByAuthor)

// // GET /
// router.get('/', verifyApiKey, verifySubscription, quoteController.getAllQuotes)

// POST /
// router.post('/', verifyApiKey, verifySubscription, quoteController.insertNewQuote)

module.exports = router
