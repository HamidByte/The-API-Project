const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const expressWinston = require('express-winston')
const { sequelize } = require('./models')
const { apiRouter, publicRouter, userAuthRouter, dashboardRouter } = require('./routes')
const connectSequelizeSessionConfig = require('./config/connectSequelizeSession')
const { customLogger } = require('./utils/loggerTransport')
const { updateLoggerOptions } = require('./utils/updateLogger')
const cors = require('cors')

require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })

const app = express()
const PORT = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('trust proxy', true)

// Enable CORS for all origins
app.use(
  cors({
    origin: true,
    methods: ['GET', 'HEAD', 'PATCH', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    optionsSuccessStatus: 204 // This is sent in response to OPTIONS requests to indicate success
  })
)

// Use pg as the session store
app.use(session(connectSequelizeSessionConfig))

// Custom middleware to store log activity
app.use((req, res, next) => {
  try {
    updateLoggerOptions(req)

    next()
  } catch (error) {
    // console.error('Error logging request:', error)
    next(error)
  }
})

// Express middleware for logging with Winston
app.use(
  expressWinston.logger({
    winstonInstance: customLogger,
    statusLevels: true,
    meta: true,
    expressFormat: true,
    colorize: false
  })
)

// Define routes
app.use('/api', apiRouter)
app.use('/', publicRouter)
app.use('/', userAuthRouter)
app.use('/', dashboardRouter)

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
// if (process.env.NODE_ENV !== 'production') {
//   process.on('unhandledRejection', (reason, promise) => {
//     console.error('Unhandled Rejection at:', promise, 'reason:', reason)
//     // Handle the error, close database connections, etc.
//   })
// }
