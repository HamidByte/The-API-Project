const express = require('express')
const dashboardController = require('../controllers/dashboardController')

const router = express.Router()

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

router.post('/change-email', async (req, res) => {
  try {
    const { email } = req.body

    const result = await dashboardController.changeUserEmail(req.session.user.userId, req.session.user.email, email)

    // Add new email in session.user
    req.session.user = {
      ...req.session.user,
      newEmail: email
    }

    if (result.error) {
      res.status(result.status).json({ error: result.error })
    } else {
      res.json({ message: 'A confirmation link has been sent to your email account.' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

router.post('/confirm-email/:token', async (req, res) => {
  try {
    const { token } = req.params
    const { email } = req.body

    const newEmail = req.session?.user?.newEmail

    if (!newEmail) {
      res.status(400).json({ error: 'No new email found in the session.' })
      return
    }

    if (email !== newEmail) {
      res.status(400).json({ error: 'Email mismatch. Please use the correct email for confirmation.' })
      return
    }

    const result = await dashboardController.confirmChangeUserEmail(req.session.user.userId, email, token)

    if (result.error) {
      res.status(result.status).json({ error: result.error })
    } else {
      // If the email change is successful, remove newEmail from the session.user
      delete req.session.user.newEmail

      res.json({ message: 'User email changed successfully.' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

router.post('/generate', async (req, res) => {
  // const userId = req.userId // const { userId } = req
  const { tokenExpiration } = req.body
  const userId = req.session.user.userId

  const result = await dashboardController.generateApiKey(userId, tokenExpiration)

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
