const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET
const config = require('config')

const withAuth = (req, res, next) => {
  const token =
    req.headers['x-access-token'] ||
    req.cookies.token
  if (!token) {
    res.status(401).send('Unauthorized: No token provided')
  }
  if (process.env.NODE_ENV === 'test') {
    if (token === config.get('testAuth')) {
      next()
      // return
    } else {
      res.status(401).send('Unauthorized')
    }
  } else {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.status(401).send(err)
      } else {
        res.email = decoded.email
        next()
      }
    })
  }
}
module.exports = { withAuth }
