const express = require('express')
const verifyApiKey = require('../middlewares/apiKeyMiddleware')
const verifySubscription = require('../middlewares/subscriptionMiddleware')
const ocrController = require('../controllers/ocrController')

const router = express.Router()

router.post('/image-to-text', verifyApiKey, verifySubscription, ocrController.getImageToText)

module.exports = router
