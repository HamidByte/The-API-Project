const express = require('express')
const authenticate = require('../middlewares/authMiddleware')
const checkSubscription = require('../middlewares/checkSubscriptionMiddleware')
const quoteController = require('../controllers/quoteController')

const router = express.Router()

// GET /random
router.get('/random', authenticate, checkSubscription, quoteController.getRandomQuote)

// GET /search?q=query
router.get('/search', authenticate, checkSubscription, quoteController.searchQuote)

// GET /:id
router.get('/:id', authenticate, checkSubscription, quoteController.getQuoteById)

// GET /category/:category
router.get('/category/:category', authenticate, checkSubscription, quoteController.getQuoteByCategory)

// GET /author/:author
router.get('/author/:author', authenticate, checkSubscription, quoteController.getQuoteByAuthor)

// // GET /
// router.get('/', authenticate, checkSubscription, quoteController.getAllQuotes)

// POST /
// router.post('/', authenticate, checkSubscription, quoteController.insertNewQuote)

module.exports = router
