const { models } = require('../models')
const subscriptionConfig = require('../config/subscriptionConfig')
const updateRequestCount = require('../utils/updateRequestCount')

const checkSubscription = async (req, res, next) => {
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

    // Update the request count after every new month since last request
    updateRequestCount(user)

    // Check the user's subscription and request count monthly limit
    const monthlyLimit = subscriptionConfig.monthlyLimits[user.subscriptionStatus]

    if (user.requestCount >= monthlyLimit) {
      return res.status(403).json({ message: `Monthly request limit reached. ${subscriptionConfig.subscriptionTypes.free} users cannot request more than ${subscriptionConfig.monthlyLimits[user.subscriptionStatus]} api requests per month.` })
    }

    // Increment requestCount for all users, including premium users
    user.requestCount += 1
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

module.exports = checkSubscription
