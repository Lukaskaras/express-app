const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/shoppinglists')

mongoose.connection.once('open', () => {
  console.log('connection made')
}).on('error', (error) => {
  console.log(error)
})
