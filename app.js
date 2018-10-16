const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const db = require('./database')

app.use(bodyParser.json({ limit: '5mb' }))
app.use(bodyParser.urlencoded({ limit: '5mb', extended: false }))
app.use(session({
  secret: 'test',
  resave: 'false',
  saveUninitialized: 'false'
}))

app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (id, done) {
  const user = db.exec(`SELECT * FROM users WHERE id=${id}`)
  done(null, user)
})

passport.use(new LocalStrategy(
  function (username, password, done) {
    const user = db.exec(`SELECT * FROM users WHERE username = "${username}"`)
    if (user.length === 0) {
      return done(null, false, {message: 'Incorrect username.'})
    }
    if (user[0].password !== password) {
      return done(null, false, {message: 'Incorrect password.'})
    }
    return done(null, user[0].username)
  })
)

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
