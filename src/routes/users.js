const express = require('express')
const router = express.Router()
const { saveUser } = require('./helpers/db')

router.post('/register', async (req, res) => {
  const { email, password, uid, name } = req.body
  const user = { email, password, uid, name }
  const result = await saveUser(user)
  const { _id } = result
  if (_id) {
    res.status(200).json(result)
  } else {
    res.status(400).send('Unable to register')
  }
})

module.exports = router
