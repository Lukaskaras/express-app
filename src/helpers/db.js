const User = require('../models/user')
const Item = require('../models/item')

const saveUser = async (user) => {
  const newUser = new User(user)
  return newUser.save()
}

const saveItem = async (item) => {
  return Item.create(item)
}

const getItemsForUid = async (uid) => {
  return Item.find({
    uid
  })
}

const getUser = async (email) => {
  return User.findOne({
    email
  }).lean()
}

module.exports = { saveUser, saveItem, getItemsForUid, getUser }
