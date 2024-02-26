// Middleware to check for a valid session
const requireSession = (req, res, next) => {
  // Check if the user is authorized (i.e. authenticated)
  if (!req.session || !req.session.user || !req.session.user.userId) {
    return res.status(401).json({ error: 'Forbidden: User is unauthorized, please login to get access to this resource.' })
  }
  next()
}

// const requireAdminRole = (req, res, next) => {
//   // Check if the user is an admin
//   if (!req.session || !req.session.user || !req.session.user.userId || req.session.user.role !== 'admin') {
//     return res.status(403).json({ error: 'Forbidden: Access to this resource requires admin privileges.' })
//   }
//   next()
// }

module.exports = requireSession
