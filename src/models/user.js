const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  uid: String
})

const User = mongoose.model('user', userSchema)

module.exports = User