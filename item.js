const mongoose = require('mongoose')

const itemModel = new mongoose.Schema({
  id: Number,
  name: String,
  quantity: Number,
  unit: String
})

mongoose.model('item', itemModel)

module.exports = mongoose.model('item')
