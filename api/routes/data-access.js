const express = require('express')
const router = express.Router()
const db_access = require('../db-utils/db-access')


router.get('/plantillaGuardia', db_access.getPlantilla) 
router.get('/treballadors' , db_access.getTreballadors)
router.get('/categories' , db_access.getCategories)





module.exports = router