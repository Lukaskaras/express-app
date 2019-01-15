const express = require('express')
const router = express.Router()
const { saveItem, deleteItem, getAllItems, searchItem } = require('../helpers/db')
const { withAuth } = require('../middleware/auth')

router.post('/', withAuth, async (req, res) => {
  const { name } = req.body
  if (!name) {
    res.status(400).send({ message: 'Property name is missing' })
  }
  const result = await saveItem({ name })
  const { _id } = result
  if (_id) {
    res.status(200).json(result)
  } else {
    res.status(400).send('Unable to save item')
  }
})

router.delete('/:itemId', withAuth, async (req, res) => {
  const { itemId } = req.params
  const result = await deleteItem(itemId)
  res.status(200).json(result)
})

router.get('', withAuth, async (req, res) => {
  const result = await getAllItems()
  res.status(200).json(result)
})

router.get('/search', withAuth, async (req, res) => {
  const { query } = req.query
  const result = await searchItem(query)
  res.status(200).json(result)
})

module.exports = router
