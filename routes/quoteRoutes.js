const express = require('express')
const verifyToken = require('../middlewares/authMiddleware')
const checkSubscription = require('../middlewares/checkSubscriptionMiddleware')
const quoteController = require('../controllers/quoteController')

const router = express.Router()

// GET /random
router.get('/random', verifyToken, checkSubscription, quoteController.getRandomQuote)

// GET /search?q=query
router.get('/search', verifyToken, checkSubscription, quoteController.searchQuote)

// GET /:id
router.get('/:id', verifyToken, checkSubscription, quoteController.getQuoteById)

// GET /category/:category
router.get('/category/:category', verifyToken, checkSubscription, quoteController.getQuoteByCategory)

// GET /author/:author
router.get('/author/:author', verifyToken, checkSubscription, quoteController.getQuoteByAuthor)

// // GET /
// router.get('/', verifyToken, checkSubscription, quoteController.getAllQuotes)

// POST /
// router.post('/', verifyToken, checkSubscription, quoteController.insertNewQuote)

module.exports = router
