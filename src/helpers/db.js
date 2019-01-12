const User = require('../models/user')
const Item = require('../models/item')
const FavoriteItem = require('../models/favorite-item')
const ListItem = require('../models/list-item')

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

const getAllItems = async () => {
  return Item.find({})
}

const searchItem = async (query) => {
  return Item.find({
    name: new RegExp(query, 'i')
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

const saveFavorite = async (favorite) => {
  const { item, userId } = favorite
  const favItem = {
    item,
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

const getListItems = async (userId) => {
  return ListItem.find({
    userId
  })
}

const saveListItem = async (listItem) => {
  const { item, quantity, userId } = listItem
  const finalListItem = {
    item,
    quantity,
    userId: mongoose.Types.ObjectId(userId)
  }
  return ListItem.create(finalListItem)
}

const deleteListItem = async (itemId) => {
  return ListItem.findByIdAndRemove(itemId)
}

module.exports = {
  saveUser,
  saveItem,
  getAllItems,
  searchItem,
  getListItems,
  getUser,
  deleteItem,
  saveFavorite,
  getFavoritesForUserId,
  deleteFavorite,
  saveListItem,
  deleteListItem
}
