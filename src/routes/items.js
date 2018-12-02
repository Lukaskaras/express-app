const express = require('express')
const router = express.Router()
const { saveItem, getItemsForUid } = require('./helpers/db')

router.post('/', async (req, res) => {
  const { name, quantity, uid } = req.body
  const item = { name, quantity, uid }
  const result = await saveItem(item)
  const { _id } = result
  if (_id) {
    res.status(200).json(result)
  } else {
    res.status(400).send('Unable to save item')
  }
})

router.get('/:userId', async (req, res) => {
  const userId = req.params.userId
  const result = await getItemsForUid(userId)
  res.status(200).json(result)
})

module.exports = router
