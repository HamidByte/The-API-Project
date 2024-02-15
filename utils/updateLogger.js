let loggerOptions = {
  postgresOptions: {
    level: 'info'
    // name: 'Postgres',
  },
  additionalData: {
    injectedUserId: null,
    injectedIpAddress: null
  }
}

function updateLoggerOptions(req) {
  // Get the remote address from the socket
  const ipv4 = req.socket.remoteAddress

  // Use the X-Forwarded-For header to get the real client IP
  const forwardedFor = req.headers['x-forwarded-for']

  // If the header is present, take the first IP in the list (client's IP)
  // Otherwise, use the remote address from the socket
  const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : ipv4

  // Capture information from the request and update the options
  loggerOptions.additionalData.injectedUserId = req.session?.user?.userId
  loggerOptions.additionalData.injectedIpAddress = ip
}

module.exports = { loggerOptions, updateLoggerOptions }
