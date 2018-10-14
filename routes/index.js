const express = require('express')
const router = express.Router()

router.use('/users', require('./users'))
router.use('/items', require('./items'))

module.exports = router
