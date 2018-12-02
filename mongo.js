const mongoose = require('mongoose')

const connectMongo = () => {
  const mongoName = process.env.MONGO_NAME
  const mongoPassword = process.env.MONGO_PASSWORD
  const uri = `mongodb+srv://${mongoName}:${mongoPassword}@cluster0-tijtk.mongodb.net/shopping-list?retryWrites=true`

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
