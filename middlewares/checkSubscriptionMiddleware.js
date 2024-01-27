const { models } = require('../models')
const subscriptionConfig = require('../config/subscriptionConfig')
const updateRequestCount = require('../utils/updateRequestCount')

const checkSubscription = async (req, res, next) => {
  try {
    // Dummy information for illustration, replace with your actual authentication logic
    // const { user } = req.body // const userId = req.userId // Assuming user data is available after authentication
    const { userId } = req.body // const userId = req.body.userId

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required in the request body.' })
    }

    // Fetch the user from the model
    const user = await models.User.findByPk(userId)

    if (!user) {
      return res.status(404).json({ error: 'User not found.' })
    }

    // Update the request count after every new month since last request
    updateRequestCount(user)

    // Check the user's subscription and request count monthly limit
    const monthlyLimit = subscriptionConfig.monthlyLimits[user.subscriptionStatus]

    if (user.requestCount >= monthlyLimit) {
      return res.status(403).json({ error: `Monthly request limit reached. ${subscriptionConfig.subscriptionTypes.free} users cannot request more than ${subscriptionConfig.monthlyLimits[user.subscriptionStatus]} api requests per month.` })
    }

    // Increment requestCount for all users, including premium users
    user.requestCount += 1
    user.lastRequestDate = new Date()
    await user.save()

    next()
  } catch (error) {
    console.error('Error checking subscription:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

module.exports = checkSubscription
