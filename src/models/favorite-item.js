const mongoose = require('mongoose')

const favoriteItemSchema = new mongoose.Schema({
  userId: mongoose.Types.ObjectId,
  item: {
    itemId: mongoose.Types.ObjectId,
    name: String
  }
})

const FavoriteItem = mongoose.model('favorite-item', favoriteItemSchema)

module.exports = FavoriteItem
