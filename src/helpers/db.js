const User = require('../../models/user')
const Item = require('../../models/item')

const saveUser = async (user) => {
  return User.create(user)
}

const saveItem = async (item) => {
  return Item.create(item)
}

const getItemsForUid = async (uid) => {
  const result = await Item.find({
    uid: uid
  })
  return result
}
module.exports = { saveUser, saveItem, getItemsForUid }
