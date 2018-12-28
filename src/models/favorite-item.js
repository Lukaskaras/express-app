const mongoose = require('mongoose')

const favoriteItemSchema = new mongoose.Schema({
  name: String,
  userId: mongoose.Types.ObjectId
})

const FavoriteItem = mongoose.model('favorite-item', favoriteItemSchema)

module.exports = FavoriteItem
