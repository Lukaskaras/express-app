const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const secret = process.env.JWT_SECRET

const isCorrectPassword = async (dbPassword, formPassword) => {
  return bcrypt.compare(formPassword, dbPassword)
}

const jwtSign = (user) => {
  return jwt.sign(user, secret, { expiresIn: '1h' })
}

module.exports = { isCorrectPassword, jwtSign }
