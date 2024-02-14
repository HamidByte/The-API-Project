const express = require('express')
const userAuthController = require('../controllers/userAuthController')

const router = express.Router()

// Routes that do not require a session
router.post('/register', userAuthController.registerUser)
router.post('/login', userAuthController.loginUser)
router.post('/forget-password', userAuthController.forgetPassword)
router.post('/reset-password/:token', userAuthController.resetPassword)

module.exports = router
