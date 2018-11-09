const db = require('../database')
const express = require('express')
const router = express.Router()

router.post('/', (req, res) => {
  if (!req.body.username) {
    res.status(400).send('Username not provided')
  }
  if (!req.body.password) {
    res.status(400).send('Password not provided')
  }
  db.exec(`INSERT INTO users (username, password) VALUES ("${req.body.username}", "${req.body.password}")`)
  res.status(200).send('User successfully created')
})

router.get('/:id', (req, res) => {
  const result = db.exec(`SELECT * FROM users WHERE id=${req.params.id}`)
  console.log(result)
  if (result.length === 0) {
    res.status(404).send(`There is no user with id ${req.params.id}`)
  }
  res.status(200).send(JSON.stringify(result[0]))
})

module.exports = router
