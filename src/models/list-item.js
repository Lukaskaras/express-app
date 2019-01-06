const mongoose = require('mongoose')

const listItemSchema = new mongoose.Schema({
  itemId: mongoose.Types.ObjectId,
  userId: mongoose.Types.ObjectId,
  quantity: Number
})

const ListItem = mongoose.model('list-item', listItemSchema)

module.exports = ListItem
