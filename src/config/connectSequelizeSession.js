const session = require('express-session')
const connectSequelizeSessionStore = require('connect-session-sequelize')(session.Store)
const { sequelize } = require('../models')
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })

// Determine if the environment is production
const isProduction = process.env.NODE_ENV === 'production'

// Configure ConnectSessionSequelize for postgreSQL
const sessionStore = new connectSequelizeSessionStore({
  db: sequelize,
  table: 'Session',
  checkExpirationInterval: 15 * 60 * 1000, // The interval at which to cleanup expired sessions in milliseconds (15 minutes in this case)
  expiration: 24 * 60 * 60 * 1000, // The maximum age (in milliseconds) of a valid session (1 day in this case)
  // Add the userId column to the list of columns that will be used by the session store
  extendDefaultFields: (defaults, session) => {
    return {
      data: defaults.data,
      expires: defaults.expires,
      userId: session.user ? session.user.userId : null
    }
  }
})

// Configure ExpressSession for client
const connectSequelizeSessionConfig = {
  store: sessionStore,
  secret: process.env.SESSION_SECRET_KEY,
  resave: false, // Don't save session if unmodified
  saveUninitialized: false, // Don't create session until something stored. Saves sessions for all visitors.
  cookie: {
    secure: isProduction, // Set to true if using HTTPS in production
    maxAge: 24 * 60 * 60 * 1000, // Set expiration time in milliseconds (1 day in this case)
    httpOnly: false, // When setting this to true, clients will not allow client-side JavaScript to access the cookie
    sameSite: isProduction ? 'none' : 'lax' // Must be 'none' to enable cross-site delivery
  }
}

module.exports = connectSequelizeSessionConfig
