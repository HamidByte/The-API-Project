const { models } = require('../models')

const requestLogger = async req => {
  try {
    await models.Log.create({
      requestUrl: req.originalUrl,
      ipAddress: req.ip,
      userAgent: req.useragent.source
    })
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error logging request:', error)
  }
}

module.exports = {
  requestLogger
}
