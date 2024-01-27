const express = require('express')
const authController = require('../controllers/authController')

const router = express.Router()

// GET /auth/token/exists (check if token exists)
router.get('/token/exists', async (req, res) => {
  const { userId } = req.body
  const exists = await authController.tokenExists(userId)
  res.json({ exists })
})

// POST /auth/token (generate token)
router.post('/token', async (req, res) => {
  const { tokenExpiration, userId } = req.body
  const token = await authController.generateToken(tokenExpiration, userId)
  res.json({ token })
})

// PUT /auth/token (regenerate token)
router.put('/token', async (req, res) => {
  const { tokenExpiration, userId } = req.body
  const token = await authController.regenerateToken(tokenExpiration, userId)
  res.json({ token })
})

// DELETE /auth/token (delete token)
router.delete('/token', async (req, res) => {
  const { userId } = req.body
  await authController.deleteToken(userId)
  res.sendStatus(204)
})

module.exports = router
