const mongoose = require('mongoose')

const itemModel = new mongoose.Schema({
  name: String,
  quantity: Number,
  unit: String
})

const shoppingListModel = new mongoose.Schema({
  name: String,
  items: [itemModel]
})

const userModel = new mongoose.Schema({
  name: String,
  shoppingLists: [shoppingListModel]
})

mongoose.model('user', userModel)

module.exports = mongoose.model('user')
