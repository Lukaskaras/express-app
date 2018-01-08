const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const connection = require('./connection')
const item = require('./item')

app.use(bodyParser.json({ limit: '5mb' }))
app.use(bodyParser.urlencoded({ limit: '5mb', extended: false }))
app.post('/', (req, res) => {
  item.create({
    id: req.body.id,
    name: req.body.name,
    quantity: req.body.quantity,
    unit: req.body.unit
  }, (err, item) => {
    if (err) {
      return res.status(500).send('There was an issue')
    } res.status(200).send(item)
  })
})

app.get('/', (req, res) => {
  res.send('test')
})

app.listen(3000)

module.exports = app
