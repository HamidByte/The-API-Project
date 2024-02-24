const express = require('express')
const publicController = require('../controllers/publicController')

const router = express.Router()

// Routes that do not require a session
router.post('/register', publicController.registerUser)
router.post('/login', publicController.loginUser)
router.post('/forget-password', publicController.forgetPassword)
router.post('/reset-password/:token', publicController.resetPassword)

module.exports = router
