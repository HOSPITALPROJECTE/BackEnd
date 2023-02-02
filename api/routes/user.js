const express = require('express')
const router = express.Router()
const userActions = require('../controllers/user.js')

router.post('/login', userActions.login)
router.post('/apuntar-se' , userActions.validateToken , userActions.apuntarse)
router.post('/estatdies' , userActions.validateToken , userActions.getEstatDies)
router.get('/categoria' , userActions.validateToken , userActions.getCategoriaTreballador )

module.exports = router;