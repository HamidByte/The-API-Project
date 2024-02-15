const express = require('express')
const requireSession = require('../middlewares/sessionMiddleware')
const apiRoutes = require('./apiRoutes')
const publicRoutes = require('./publicRoutes')
const userAuthRoutes = require('./userAuthRoutes')
const dashboardRoutes = require('./dashboardRoutes')

const apiRouter = express.Router()
const publicRouter = express.Router()
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
