const express = require('express')
const requireSession = require('../middlewares/sessionMiddleware')
const publicRoutes = require('./publicRoutes')
const apiRoutes = require('./apiRoutes')
const userAuthRoutes = require('./userAuthRoutes')
const dashboardRoutes = require('./dashboardRoutes')

const publicRouter = express.Router()
const apiRouter = express.Router()
const userAuthRouter = express.Router()
const dashboardRouter = express.Router()

// Routes that do not require a session
publicRouter.get('/', async (req, res) => {
  res.send('The API Project')
})

publicRouter.use('/', publicRoutes)
apiRouter.use('/', apiRoutes)

// Routes that require a session
userAuthRouter.use(requireSession)
dashboardRouter.use(requireSession)
userAuthRouter.use('/', userAuthRoutes)
dashboardRouter.use('/', dashboardRoutes)

module.exports = {
  publicRouter,
  apiRouter,
  userAuthRouter,
  dashboardRouter
}
