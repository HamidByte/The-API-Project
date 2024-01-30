const express = require('express')
const dashboardController = require('../controllers/dashboardController')

const router = express.Router()

router.post('/generate', async (req, res) => {
  // const userId = req.userId // const { userId } = req
  const { tokenExpiration, userId } = req.body
  const apiKey = await dashboardController.generateApiKey(tokenExpiration, userId)
  res.json({ apiKey })
})

router.get('/api-key', async (req, res) => {
  // const userId = req.userId // const { userId } = req
  const { userId } = req.body
  const apiKey = await dashboardController.getApiKey(userId)
  res.json({ apiKey })
})

router.delete('/revoke', async (req, res) => {
  // const userId = req.userId // const { userId } = req
  const { userId } = req.body
  await dashboardController.revokeApiKey(userId)
  res.sendStatus(204)
})

module.exports = router
