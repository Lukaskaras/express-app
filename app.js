const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json({ limit: '5mb' }))
app.use(bodyParser.urlencoded({ limit: '5mb', extended: false }))

app.use((req, res, next) => {
  console.log('calling ' + req.method + ' for ' + req.path + ' -> ' + JSON.stringify(req.query) + ' -> ' + JSON.stringify(req.body))
  next()
})

app.use('/', require('./routes/index'))

if (process.env.NODE_ENV !== 'test') {
  app.listen(3000, () => {
    console.log('listening on port 3000')
  })
}

module.exports = app
