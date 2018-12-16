const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  userId: mongoose.Types.ObjectId
})

const Item = mongoose.model('item', itemSchema)

module.exports = Item
