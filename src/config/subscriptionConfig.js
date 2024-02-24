module.exports = {
  subscriptionTypes: {
    free: 'Free',
    premium: 'Premium'
  },
  monthlyLimits: {
    free: 1000,
    premium: Infinity
  },
  credits: {
    none: 0, // free api
    standard: 1, // default credit per request
    ocr: 10 // ocr credit per request
  }
}
