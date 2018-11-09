const express = require('express')
const router = express.Router()

router.use('/users', require('./users'))
router.use('/items', require('./items'))
router.use('/login', require('./login'))

module.exports = router
