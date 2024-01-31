const express = require('express')
const dashboardController = require('../controllers/dashboardController')

const router = express.Router()

// Middleware to check for a valid session
const requireSession = (req, res, next) => {
  if (!req.session || !req.session.user) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  next()
}

// Apply the middleware to all routes in this router
router.use(requireSession)

router.post('/generate', async (req, res) => {
  // const userId = req.userId // const { userId } = req
  const { tokenExpiration } = req.body
  const userId = req.session.user.userId
  const result = await dashboardController.generateApiKey(tokenExpiration, userId)

  if (result.error) {
    res.status(result.status || 500).json({ error: result.error })
  } else {
    res.json({ apiKey: result })
  }
})

router.get('/api-key', async (req, res) => {
  // const userId = req.userId // const { userId } = req
  // const { userId } = req.body
  const userId = req.session.user.userId

  const result = await dashboardController.getApiKey(userId)

  if (result.error) {
    res.status(result.status || 500).json({ error: result.error })
  } else {
    res.json({ apiKey: result })
  }
})

router.delete('/revoke', async (req, res) => {
  // const userId = req.userId // const { userId } = req
  // const { userId } = req.body
  const userId = req.session.user.userId

  const result = await dashboardController.revokeApiKey(userId)

  if (result.error) {
    res.status(result.status || 500).json({ error: result.error })
  } else {
    res.json(result)
  }
})

module.exports = router
