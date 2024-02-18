const corsOptions = {
  origin: true, // '*'
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'], // 'GET,HEAD,PUT,PATCH,POST,DELETE',
  // allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
  credentials: true,
  optionsSuccessStatus: 204 // This is sent in response to OPTIONS requests to indicate success
}

module.exports = corsOptions
