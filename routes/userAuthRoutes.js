const express = require('express')
const userAuthController = require('../controllers/userAuthController')

const router = express.Router()

router.post('/register', userAuthController.registerUser)
router.post('/login', userAuthController.loginUser)
router.get('/activate', userAuthController.activateUser)
router.post('/resend-activation', userAuthController.resendActivation)
router.post('/forget-password', userAuthController.forgetPassword)
router.post('/reset-password/:token', userAuthController.resetPassword)
router.get('/get-user', userAuthController.getUser)
router.delete('/delete', userAuthController.deleteUser)

module.exports = router
