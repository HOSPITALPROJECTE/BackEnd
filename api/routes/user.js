const express = require('express')
const router = express.Router()
const userActions = require('../controllers/user.js')

router.post('/login', userActions.login)

module.exports = router;