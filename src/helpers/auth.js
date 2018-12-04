const jwt = require('jsonwebtoken')

const secret = process.env.JWT_SECRET

const isCorrectPassword = (dbPassword, formPassword) => {
  return dbPassword === formPassword
}

const jwtSign = (user) => {
  return jwt.sign(user, secret, { expiresIn: '1h' })
}

module.exports = { isCorrectPassword, jwtSign }
