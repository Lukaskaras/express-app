const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const dotenv = require('dotenv')
const { connectMongo } = require('./mongo')
const cookieParser = require('cookie-parser')

if (process.env.NODE_ENV !== 'production') {
  dotenv.load()
}

connectMongo()
app.use(bodyParser.json({ limit: '5mb' }))
app.use(bodyParser.urlencoded({ limit: '5mb', extended: false }))
app.use(cookieParser())
app.use((req, res, next) => {
  console.log('calling ' + req.method + ' for ' + req.path + ' -> ' + JSON.stringify(req.query) + ' -> ' + JSON.stringify(req.body))
  next()
})

app.use('/', require('./src/routes/index'))

if (process.env.NODE_ENV !== 'test') {
  app.listen(3500, () => {
    console.log('listening on port 3500')
  })
}

module.exports = app
