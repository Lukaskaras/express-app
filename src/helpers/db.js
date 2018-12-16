const User = require('../models/user')
const Item = require('../models/item')
const mongoose = require('mongoose')

const saveUser = async (user) => {
  const newUser = new User(user)
  return newUser.save()
}

const saveItem = async (item) => {
  const { name, quantity, userId } = item
  const superItem = {
    name,
    quantity,
    userId: mongoose.Types.ObjectId(userId)
  }
  return Item.create(superItem)
}

const getItemsForUserId = async (userId) => {
  return Item.find({
    userId
  })
}

const getUser = async (email) => {
  return User.findOne({
    email
  }).lean()
}

module.exports = { saveUser, saveItem, getItemsForUserId, getUser }
