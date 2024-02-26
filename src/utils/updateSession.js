const { models } = require('../models')

async function updateSession(req, user) {
  try {
    const { uuid } = user
    const { email } = user

    // Look for the sid in database by current server's sessionID
    const session = await models.Session.findOne({
      where: { sid: req.sessionID }
    })

    // Use Sequelize's describe method to get information about the Session model
    const sessionTableDescription = await models.Session.describe()
    // Check if the 'userId' column exists in the description
    const userIdColumnExists = 'userId' in sessionTableDescription

    // Set user details in the current server session
    // connectSequelizeSession will automatically sync it with database
    req.session.user = {
      userId: uuid,
      email: email
    }

    // Explicitly update Session table in the database for userId
    if (session && userIdColumnExists) {
      session.userId = uuid
      await session.save()
    } else {
      // If the session doesn't exist, create it with userId
      await models.Session.create({
        sid: req.sessionID,
        expires: req.session.cookie.expires,
        data: JSON.stringify(req.session),
        userId: uuid
      })
    }
  } catch (error) {
    console.error('Error updating session:', error)
  }
}

module.exports = {
  updateSession
}
