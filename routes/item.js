const db = require('../database')
const express = require('express')
const router = express.Router()

router.post('/', (req, res) => {
  db.exec(`INSERT INTO items (${req.body.id}, "${req.body.name}", ${req.body.userId})`)
  res.status(200).send('item is saved')
})

router.get('/', (req, res) => {
  const result = db.exec(`SELECT * FROM items`)
  res.status(200).send(JSON.stringify(result))
})

router.get('/:id', (req, res) => {
  const result = db.exec(`SELECT * FROM items WHERE id=${req.params.id}`)
  res.status(200).send(JSON.stringify(result))
})

router.delete('/:id', (req, res) => {
  db.exec(`DELETE * FROM items WHERE id=${req.params.id}`)
})
module.exports = router
