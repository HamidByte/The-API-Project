const { models } = require('../models')
const subscriptionConfig = require('../config/subscriptionConfig')
const resetCreditCount = require('../utils/resetCreditCount')
const ROUTES = require('../utils/definitions/routes')

// Check subscription
const verifySubscription = async (req, res, next) => {
  try {
    // const { userId } = req.body // const userId = req.body.userId
    const userId = req.userId

    if (!userId) {
      return res.status(400).json({ error: 'User id not found.' })
    }

    // Fetch the user from the model
    const user = await models.User.findByPk(userId)

    if (!user) {
      return res.status(404).json({ error: 'User not found.' })
    }

    // User confirmation status
    if (!user.isConfirmed) {
      return res.status(401).json({ error: 'User is not confirmed or activated. Please activate your account.' })
    }

    // Reset the credit counts after every new month since last request
    resetCreditCount(user)

    // Increment credit counts for all users, including premium users, based on the API credits requirement
    const endpointFound = Object.values(ROUTES).some(route => req.originalUrl.includes(route))

    if (endpointFound) {
      // Check if the endpoint is for OCR API
      if (req.originalUrl.includes(ROUTES.OCR)) {
        user.creditCount += subscriptionConfig.credits.ocr
      } else {
        // For other APIs, use standard credits
        user.creditCount += subscriptionConfig.credits.standard
      }
      // Endpoint found but req.originalUrl does not match any ROUTES definitions
    } else {
      // Endpoint not found in ROUTES definitions, use zero credits
      user.creditCount += subscriptionConfig.credits.none
    }

    // Check the user's subscription and request count monthly limit
    const monthlyLimit = subscriptionConfig.monthlyLimits[user.subscriptionStatus]

    if (user.creditCount >= monthlyLimit + 1) {
      return res.status(403).json({ message: `Monthly request limit exceeded. Users with a ${subscriptionConfig.subscriptionTypes.free} subscription are restricted to a maximum of ${subscriptionConfig.monthlyLimits[user.subscriptionStatus]} API requests per month.` })
    }

    user.requestCount += 1 // Grand total request counts
    user.lastRequestDate = new Date()
    await user.save()

    next()
  } catch (error) {
    const errorMessage = `Error during checking subscription: ${error.message}`

    if (process.env.NODE_ENV === 'development') {
      console.error(errorMessage, error)
      return res.status(500).json({ error: 'Internal Server Error' })
    } else {
      return res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}

module.exports = verifySubscription
