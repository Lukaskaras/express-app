const express = require('express')
const router = express.Router()
const { saveFavorite, getFavoritesForUserId, deleteFavorite } = require('../helpers/db')
const { withAuth } = require('../middleware/auth')

router.post('/', withAuth, async (req, res) => {
  const { name, userId } = req.body
  const result = await saveFavorite({ name, userId })
  const { _id } = result
  if (_id) {
    res.status(200).json(result)
  } else {
    res.status(400).send('Unable to save favorite item')
  }
})

router.get('/:userId', withAuth, async (req, res) => {
  const userId = req.params.userId
  const result = await getFavoritesForUserId(userId)
  res.status(200).json(result)
})

router.delete('/:itemId', withAuth, async (req, res) => {
  const { itemId } = req.params
  const result = await deleteFavorite(itemId)
  res.status(200).json(result)
})

module.exports = router
