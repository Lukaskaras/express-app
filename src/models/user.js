const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const saltRounds = 10

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  uid: String
})

userSchema.pre('save', function (next) {
  const document = this
  bcrypt.hash(this.password, saltRounds, (err, hashedPassword) => {
    if (this.isNew || this.isModified('password')) {
      if (err) {
        next(err)
      } else {
        document.password = hashedPassword
        next()
      }
    }
  })
})

const User = mongoose.model('user', userSchema)

module.exports = User
