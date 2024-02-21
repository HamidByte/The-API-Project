// Middleware to check for a valid session
const requireSession = (req, res, next) => {
  if (!req.session || !req.session.user) {
    return res.status(401).json({ error: 'Unauthorized: Please login to get access to this resource.' })
  }
  next()
}

module.exports = requireSession
