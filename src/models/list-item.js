const mongoose = require('mongoose')

const listItemSchema = new mongoose.Schema({
  userId: mongoose.Types.ObjectId,
  quantity: Number,
  item: {
    itemId: mongoose.Types.ObjectId,
    name: String
  }
})

const ListItem = mongoose.model('list-item', listItemSchema)

module.exports = ListItem
