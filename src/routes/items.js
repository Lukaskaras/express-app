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
