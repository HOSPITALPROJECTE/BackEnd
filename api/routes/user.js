const express = require('express')
const router = express.Router()
const userActions = require('../controllers/user.js')

router.post('/login', userActions.login)
router.post('/apuntar-se' , userActions.validateToken , userActions.apuntarse)
router.post('/estatguardies' , userActions.validateToken , userActions.getEstatGuardies)

module.exports = router;