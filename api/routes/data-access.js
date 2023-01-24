const express = require('express')
const router = express.Router()
const db_access = require('../db-utils/db-access')


router.get('/plantillaGuardia', db_access.getPlantilla) 
router.get('/treballadors' , db_access.getTreballadors)
router.get('/treballador' , db_access.getTreballador)
router.get('/categories' , db_access.getCategories)
router.get('/guardiestreballador' , db_access.getGuardiesTreballador)
router.get('/getAgendaTreballador' , db_access.getGuardiesTreballador)
router.get('/getTorns' , db_access.getTorns)





module.exports = router