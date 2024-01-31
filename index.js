const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const connectSessionSequelize = require('connect-session-sequelize')(session.Store)
const morgan = require('morgan')
const useragent = require('express-useragent')
const { sequelize } = require('./models')
const logger = require('./utils/logger')
const userAuthRoutes = require('./routes/userAuthRoutes')
const dashboardRoutes = require('./routes/dashboardRoutes')
const routes = require('./routes')

require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3000

// Logging middleware
app.use(morgan('combined'))

// User agent middleware
app.use(useragent.express())

// Custom middleware to log and store information
app.use(async (req, res, next) => {
  // Use the logging utility to log and store information
  await logger.requestLogger(req)

  next()
})

// Use pg as the session store
app.use(
  session({
    store: new connectSessionSequelize({
      db: sequelize
    }),
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true, // Saves sessions for all visitors
    cookie: {
      secure: false, // Set to true if using HTTPS
      maxAge: 3600000, // Set expiration time in milliseconds
      httpOnly: true // HTTP only flag
    }
  })
)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Define routes
app.use('/agent', (req, res) => {
  res.send({ useragent: req.useragent })
})
app.use('/', userAuthRoutes)
app.use('/', dashboardRoutes)
app.use('/api', routes)

// Error handling middleware
app.use((error, req, res, next) => {
  // Send a more detailed error response in development
  if (process.env.NODE_ENV === 'development') {
    console.error(error.stack)
    res.status(500).json({ error: error.message, stack: error.stack })
  } else {
    res.status(500).send('Something went wrong!')
  }
})

// Sync database and start server
sequelize.sync().then(() => {
  console.log('Database synchronized successfully')
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
})

// Handle Promise Rejections
if (process.env.NODE_ENV !== 'production') {
  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason)
    // Handle the error, close database connections, etc.
  })
}
