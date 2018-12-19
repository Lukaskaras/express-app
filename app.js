const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const dotenv = require('dotenv')
const { connectMongo } = require('./mongo')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const config = require('config')

if (process.env.NODE_ENV !== 'production') {
  dotenv.load()
}

if (process.env.NODE_ENV !== 'test') {
  connectMongo()
}
app.use(bodyParser.json({ limit: '5mb' }))
app.use(bodyParser.urlencoded({ limit: '5mb', extended: false }))
app.use(cookieParser())
app.use(cors())
app.use((req, res, next) => {
  console.log('calling ' + req.method + ' for ' + req.path + ' -> ' + JSON.stringify(req.query) + ' -> ' + JSON.stringify(req.body))
  next()
})

app.use('/', require('./src/routes/index'))

const port = process.env.PORT || config.get('port')
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`listening on port ${port}`)
  })
}

module.exports = app
