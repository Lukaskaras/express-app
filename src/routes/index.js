const express = require('express')
const router = express.Router()

router.use('/users', require('./users'))
router.use('/items', require('./items'))
router.use('/favorites', require('./favorites'))
router.use('/list-items', require('./list-items'))

module.exports = router
