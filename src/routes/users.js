const express = require('express')
const router = express.Router()
const { saveUser, getUser } = require('../helpers/db')
const { isCorrectPassword, jwtSign } = require('../helpers/auth')

router.post('/register', async (req, res) => {
  const { email, password, name } = req.body
  const user = { email, password, name }
  const exists = await getUser(email)
  if (exists) {
    res.status(400).json({ message: 'Email already exists' })
    return
  }
  const result = await saveUser(user)
  const { _id } = result
  if (_id) {
    res.status(200).json({ message: 'Registration successful' })
  } else {
    res.status(500).send({ message: 'Unable to register' })
  }
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  const result = await getUser(email)
  let token
  if (result) {
    const correctPassword = await isCorrectPassword(result.password, password)
    if (!correctPassword) {
      res.status(401).send({ message: 'Incorrect email or password' })
      return
    }
  } else {
    res.status(401).send({ message: 'Incorrect email or password' })
    return
  }
  delete result.password
  token = jwtSign(result)
  res.status(200).send({ token, userId: result._id })
})

module.exports = router
