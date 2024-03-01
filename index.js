const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
// const https = require('https')
const corsOptions = require('./src/config/corsOptions')
const session = require('express-session')
const connectSequelizeSessionConfig = require('./src/config/connectSequelizeSession')
const { updateLoggerOptions } = require('./src/utils/updateLogger')
const expressWinston = require('express-winston')
const { customLogger } = require('./src/utils/loggerTransport')
const { sequelize } = require('./src/models')
const { publicRouter, apiRouter, userAuthRouter, dashboardRouter } = require('./src/routes')
// const httpsOptions = require('./src/config/httpsOptions')

require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })
const { hostName, portNumber, baseURLServer } = require('./src/config/serverConfig')
require('colors')

const app = express()
const HOST = process.env.HOST || hostName
const PORT = process.env.PORT || portNumber
const BASE_URL = process.env.BASE_URL_SERVER || baseURLServer

app.set('trust proxy', true)

// Enable CORS for all origins
app.use(cors(corsOptions))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

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
app.use('/', publicRouter)
app.use('/', apiRouter)
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
  console.log('Database synchronized successfully'.green)

  if (process.env.NODE_ENV === 'production') {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`.blue)
    })
  } else {
    app.listen(PORT, HOST, () => {
      console.log(`Server is running on ${BASE_URL}`.blue)
    })

    // https.createServer(httpsOptions, app).listen(PORT, HOST, () => {
    //   console.log(`Server is running on ${BASE_URL}`.blue)
    // })
  }
})

// Handle Promise Rejections
// if (process.env.NODE_ENV !== 'production') {
//   process.on('unhandledRejection', (reason, promise) => {
//     console.error('Unhandled Rejection at:', promise, 'reason:', reason)
//     // Handle the error, close database connections, etc.
//   })
// }
