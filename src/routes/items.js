const express = require('express')
const router = express.Router()
const { saveItem, getItemsForUserId, deleteItem } = require('../helpers/db')
const { withAuth } = require('../middleware/auth')

router.post('/', async (req, res) => {
  const { name, quantity, userId } = req.body
  const item = { name, quantity, userId }
  const result = await saveItem(item)
  const { _id } = result
  if (_id) {
    res.status(200).json(result)
  } else {
    res.status(400).send('Unable to save item')
  }
})

router.get('/:userId', withAuth, async (req, res) => {
  const userId = req.params.userId
  const result = await getItemsForUserId(userId)
  res.status(200).json(result)
})

router.delete('/:itemId', withAuth, async (req, res) => {
  const { itemId } = req.params
  const result = await deleteItem(itemId)
  res.status(200).json(result)
})

module.exports = router
