const mongoose = require('mongoose')

// TODO: move to env variable
const uri = 'mongodb+srv://lukastest:SecureMongo1@cluster0-tijtk.mongodb.net/shopping-list?retryWrites=true'

const connectMongo = () => {
  mongoose.connect(uri, { useNewUrlParser: true })
  const db = mongoose.connection
  db.on('error', console.error.bind(console, 'connection error:'))
  db.once('open', function () {
    console.log('Connected to mongo')
  })
}

const closeConnection = () => {
  mongoose.connection.close()
}
module.exports = { connectMongo, closeConnection }
