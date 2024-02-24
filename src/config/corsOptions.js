const corsOptions = {
  origin: true, // '*'
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'], // 'GET,HEAD,PUT,PATCH,POST,DELETE',
  // allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
  credentials: true, // Configures the Access-Control-Allow-Credentials CORS header. Set to true to pass the header, otherwise it is omitted.
  optionsSuccessStatus: 204 // This is sent in response to OPTIONS requests to indicate success
}

module.exports = corsOptions
