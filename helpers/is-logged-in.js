function isLoggedIn (req, res, next) {
  console.log('loggedin?')
  if (req.isAuthenticated()) {
    next()
  } else {
    res.status(401).send()
  }
}

module.exports = isLoggedIn
