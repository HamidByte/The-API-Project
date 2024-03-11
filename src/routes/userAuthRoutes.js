const express = require('express')
const userAuthController = require('../controllers/userAuthController')

const router = express.Router()

// Routes that require a session
router.get('/activate', userAuthController.activateUser)
router.post('/resend-activation', userAuthController.resendActivation)
router.get('/get-user', userAuthController.getUser)
router.get('/is-user-active', userAuthController.isUserActive)
router.get('/logout', userAuthController.logoutUser)
router.delete('/delete', userAuthController.deleteUser)

module.exports = router
