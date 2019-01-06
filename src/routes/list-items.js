const express = require('express')
const router = express.Router()
const { saveListItem, getListItems, deleteListItem } = require('../helpers/db')
const { withAuth } = require('../middleware/auth')

router.post('/', withAuth, async (req, res) => {
  const { itemId, quantity, userId } = req.body
  const item = { itemId, quantity, userId }
  const result = await saveListItem(item)
  const { _id } = result
  if (_id) {
    res.status(200).json(result)
  } else {
    res.status(400).send('Unable to save item')
  }
})

router.get('/:userId', withAuth, async (req, res) => {
  const userId = req.params.userId
  const result = await getListItems(userId)
  res.status(200).json(result)
})

router.delete('/:itemId', withAuth, async (req, res) => {
  const { itemId } = req.params
  const result = await deleteListItem(itemId)
  res.status(200).json(result)
})

module.exports = router
