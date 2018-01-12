const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const user = require('./user')
const connection = require('./connection')

app.use(bodyParser.json({ limit: '5mb' }))
app.use(bodyParser.urlencoded({ limit: '5mb', extended: false }))
app.post('/item/:userName/:listName', (req, res) => {
  const newItem = {
    name: req.body.name,
    quantity: req.body.quantity,
    unit: req.body.unit
  }
  user.findOneAndUpdate({
    'name': req.params.userName,
    'shoppingLists.name': req.params.listName
  }, {
    $addToSet: {
      'shoppingLists.$.items': newItem
    }
  }, (err, item) => {
    if (err) {
      return res.status(500).send('There was an issue')
    } res.status(200).send(item)
  })
})

app.post('/user', (req, res) => {
  user.create({
    id: req.body.id,
    name: req.body.name,
    shoppingLists: req.body.shoppingLists
  }, (err, user) => {
    if (err) {
      return res.status(500).send('There was an issue')
    } res.status(200).send(user)
  })
})

app.post('/shopping-list/:userName', (req, res) => {
  const list = {
    id: req.body.id,
    name: req.body.name,
    items: req.body.items
  }
  user.update({ 'name': req.params.userName }, {
    $addToSet: {
      shoppingLists: list
    }
  }, (err, item) => {
    if (err) {
      return res.status(500).send('There was an issue')
    } res.status(200).send(user)
  })
})

app.get('/', (req, res) => {
  res.send(user.find({
    name: 'user'
  }))
})

app.listen(3000, () => {
  console.log('listening on port 3000')
})

module.exports = app
