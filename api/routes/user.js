const express = require('express')
const router = express.Router()
const connection = require("../db-utils/db-connection.js") 
const userController = require('../controllers/user.js')


router.get('/plantillaGuardia', (req , res , next) => {
        connection.query("select * from plantilla_guardia where unitat = 'Unitat 1' and torn = 'Dia';",
        (err , result) => {
            if (err){
                res.status(400).send("Error");
            }
            res.status(200).send({
                "resultat" : {"dades" : result}
            })
        })
}) 

module.exports = router