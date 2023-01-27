const express = require('express')
const router = express.Router()
const db_access = require('../db-utils/db-access')


router.get('/getPlantilla', db_access.getPlantilla) 
router.get('/treballadors' , db_access.getTreballadors)
router.get('/treballador' , db_access.getTreballador)
router.get('/categories' , db_access.getCategories)
router.get('/guardiestreballador' , db_access.getGuardiesTreballador)
router.get('/getAgendaTreballador' , db_access.getGuardiesTreballador)
router.get('/getHistorialTreballador' , db_access.getHistorialTreballador)
router.get('/getTorns' , db_access.getTorns)
router.get('/getUnitats' , db_access.getUnitats)
router.get('/getFestius' , db_access.getFestius)
router.post('/updateFestiu', db_access.updateFestiu) 
router.post('/insertFestiu', db_access.insertFestiu) 

module.exports = router