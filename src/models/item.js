const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  uid: String
})

const Item = mongoose.model('item', itemSchema)

module.exports = Item
