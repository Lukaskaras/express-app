const User = require('../models/user')
const Item = require('../models/item')
const FavoriteItem = require('../models/favorite-item')

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

const deleteItem = async (itemId) => {
  return Item.findByIdAndRemove(itemId)
}

const saveFavorite = async (item) => {
  const { name, quantity, userId } = item
  const favItem = {
    name,
    quantity,
    userId: mongoose.Types.ObjectId(userId)
  }
  return FavoriteItem.create(favItem)
}

const getFavoritesForUserId = async (userId) => {
  return FavoriteItem.find({
    userId
  })
}

const deleteFavorite = async (itemId) => {
  return FavoriteItem.findByIdAndRemove(itemId)
}

module.exports = {
  saveUser,
  saveItem,
  getItemsForUserId,
  getUser,
  deleteItem,
  saveFavorite,
  getFavoritesForUserId,
  deleteFavorite
}
