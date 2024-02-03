const express = require('express')
const requireSession = require('../middlewares/sessionMiddleware')
const dashboardController = require('../controllers/dashboardController')

const router = express.Router()

// Apply the middleware to all routes in this router
router.use(requireSession)

router.post('/update-profile', async (req, res) => {
  try {
    const { username, firstName, lastName, password } = req.body

    const result = await dashboardController.updateUserProfile(req.session.user.userId, {
      username,
      firstName,
      lastName,
      password
    })

    if (result.error) {
      res.status(result.status).json({ error: result.error })
    } else {
      res.json({ message: 'Profile updated successfully.' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

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
