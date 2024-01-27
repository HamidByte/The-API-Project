const updateRequestCount = user => {
  const currentDate = new Date()
  const lastRequestDate = user.lastRequestDate

  // Check if it's a new month since the last request
  if (currentDate.getMonth() !== lastRequestDate.getMonth() || currentDate.getFullYear() !== lastRequestDate.getFullYear()) {
    // If it's a new month, reset requestCount to 0
    user.requestCount = 0
  }
}

module.exports = updateRequestCount
