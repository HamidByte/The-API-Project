const express = require('express')
const bodyParser = require('body-parser')
const { sequelize } = require('./models')
const userAuthRoutes = require('./routes/userAuthRoutes')
const dashboardRoutes = require('./routes/dashboardRoutes')
const routes = require('./routes')

const app = express()
const PORT = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Define routes
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
