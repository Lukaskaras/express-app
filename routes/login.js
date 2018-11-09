const db = require('../database')
const express = require('express')
const router = express.Router()
const passport = require('passport')

router.post('/', (req, res, next) => {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      res.status(500).send(err)
    }
    if (user) {
      req.logIn(user, function (err) {
        if (err) {
          return next(err)
        }
        res.status(200).send({token: user})
      })
      return
    }
    if (!user) {
      console.log(info)
      res.status(401).send('Incorrect username or password')
    }
  })(req, res, next)
})

module.exports = router
