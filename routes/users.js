const db = require('../database')
const express = require('express')
const router = express.Router()

router.post('/', (req, res) => {
  db.exec(`INSERT INTO users (name, password) VALUES ("${req.body.name}", "${req.body.password}")`)
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
