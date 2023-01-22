const bcrypt = require('bcrypt');
const User = require("../model/implementations/user/user.js");
const Token = require('../model/implementations/Token/token.js')
const connection = require('../db-utils/db-connection.js')
const { off } = require('../db-utils/db-connection.js');
const e = require('express');


const token = new Token();

const login = (async (req, res) => {
    
    res.header('Access-Control-Allow-Origin: *');
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');


    connection.query("select dni from treballador where nom = ? and password = ?;", [req.body.nom ,req.body.password] , (err, result) => {
            if (err) {
                res.status(400).send("Error al obtenir usuari");
            }

            if(result.length == 0) res.status(401).send("incorrecte")
            else{
            token.generateAccessToken({dni : result[0].dni});
            token.generateRefreshToken({dni : result[0].dni});
            res.status(200).send({
                "resultat": { "accessToken": token.accessToken , "refreshToken" : token.refreshToken}
            })}
        })
}
)

module.exports = {login}