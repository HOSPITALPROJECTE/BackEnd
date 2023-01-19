const express = require('express')
const router = express.Router()
const db_access = require('../db-utils/db-access')
const connection = require("../db-utils/db-connection.js") 


router.get('/plantillaGuardia', db_access.getPlantilla) 
router.get('/treballadors' , db_access.getTreballadors)





module.exports = router