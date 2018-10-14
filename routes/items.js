const db = require('../database')
const express = require('express')
const router = express.Router()
const isLoggedIn = require('../helpers/is-logged-in')

router.post('/', isLoggedIn, (req, res) => {
  db.exec(`INSERT INTO items (name, userId, quantity, unit) VALUES ("${req.body.name}", ${req.body.userId}, ${req.body.quantity}, "${req.body.unit}")`)
  res.status(200).send('item is saved')
})

router.get('/', (req, res) => {
  const result = db.exec(`SELECT * FROM items`)
  if (result.length === 0) {
    res.status(404).send('There are no items')
  }
  res.status(200).send(JSON.stringify(result))
})

router.get('/:id', (req, res) => {
  const result = db.exec(`SELECT * FROM items WHERE id=${req.params.id}`)
  if (result.length === 0) {
    res.status(404).send(`There is no item with id ${req.params.id}`)
  }
  res.status(200).send(JSON.stringify(result[0]))
})

router.delete('/:id', (req, res) => {
  const result = db.exec(`DELETE FROM items WHERE id=${req.params.id}`)
  if (result === 1) {
    res.status(200).send('The item was successfully deleted')
  } else {
    res.status(404).send('The item does not exist')
  }
})

router.delete('/user/:userId', (req, res) => {
  const result = db.exec(`DELETE FROM items WHERE userId=${req.params.userId}`)
  if (result === 0) {
    res.status(404).send('There are no items to delete')
  } else {
    res.status(200).send('All your items were deleted')
  }
})
module.exports = router
