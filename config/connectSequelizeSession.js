const session = require('express-session')
const connectSequelizeSessionStore = require('connect-session-sequelize')(session.Store)
const { sequelize } = require('../models')

// Configure sessionStore for pg
const sessionStore = new connectSequelizeSessionStore({
  db: sequelize,
  table: 'Session',
  checkExpirationInterval: 15 * 60 * 1000, // The interval at which to cleanup expired sessions in milliseconds (15 minutes in this case)
  expiration: 24 * 60 * 60 * 1000, // The maximum age (in milliseconds) of a valid session (1 day in this case)
  // Add the userId column to the list of columns that will be used by the session store
  extendDefaultFields: (defaults, session) => {
    return {
      userId: session.user ? session.user.userId : null,
      data: defaults.data,
      expires: defaults.expires
    }
  }
})

const connectSequelizeSessionConfig = {
  store: sessionStore,
  secret: process.env.SESSION_SECRET_KEY,
  resave: false, // Don't save session if unmodified
  saveUninitialized: false, // Don't create session until something stored. Saves sessions for all visitors.
  cookie: {
    // secure: process.env.NODE_ENV === 'production',
    secure: false, // Set to true if using HTTPS
    maxAge: 24 * 60 * 60 * 1000, // Set expiration time in milliseconds
    httpOnly: true // HTTP only flag
    // sameSite: 'None'
  }
}

module.exports = connectSequelizeSessionConfig
