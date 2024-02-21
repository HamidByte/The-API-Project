const express = require('express')
const verifyToken = require('../middlewares/authMiddleware')
const checkSubscription = require('../middlewares/checkSubscriptionMiddleware')
const ocrController = require('../controllers/ocrController')

const router = express.Router()

router.post('/image-to-text', verifyToken, checkSubscription, ocrController.getImageToText)

module.exports = router
