const jwt = require('jsonwebtoken')
const Token = require('../model/implementations/Token/token.js')
const connection = require('../db-utils/db-connection.js')



const token = new Token();

const login = (async (req, res) => {

    res.header('Access-Control-Allow-Origin: *');
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');


    connection.query("select dni,rol,categoria from treballador where nom = ? and password = ? and estat = 'actiu'", [req.body.nom, req.body.password], (err, result) => {
        if (err) {
            res.status(400).send("Error al obtenir usuari");
        }

        if (result.length == 0) res.status(401).send("incorrecte")
        else {
            let dataObject = {
                dni: result[0].dni,
                categoria: result[0].categoria,
                rol:result[0].rol
            }
            token.generateAccessToken(dataObject);
            token.generateRefreshToken(dataObject);
            res.status(200).send({
                "resultat": { "accessToken": token.accessToken, "refreshToken": token.refreshToken }
            })
        }
    })
}
)

const apuntarse = (async (req, res) => {

    res.header('Access-Control-Allow-Origin: *');
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');


    connection.query("insert into guardies_x_treballador (dni_treballador , id_guardia  , estat_guardia , estat) values (? , ? , 'apuntat' , 'actiu')",
        [req.body.dni, req.body.id_guardia],
        (err, result) => {
            if (err) {
                res.status(401).send("Error al apuntar-se");
            }

            res.status(200).send("Correcte!!")
        }
    )
})

const getEstatGuardies = (async (req, res, next) => {

    res.header('Access-Control-Allow-Origin: *');
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
    res.header('Content-Type', 'application/json');

    let rangMes = obtenirRangMes(req.body.data)
   
    connection.query("select distinct data_guardia , estat_guardia from guardiesTreballadorData where dni_treballador = ? and data_guardia between ? and ?",
        [req.token.dni , rangMes.primer_dia , rangMes.ultim_dia],
        (err, result) => {
            if (err) {
                res.status(401).send("Error al apuntar-se");
            }
            console.log(req.token.dni)
            console.log(rangMes.primer_dia)
            console.log(rangMes.ultim_dia)
            res.status(200).send({guardies : result})
        }
    )

});

const obtenirRangMes= (dataRequest) =>{

    let data = new Date(dataRequest)
    var firstDay = new Date(data.getFullYear(), data.getMonth(), 1);
    var lastDay = new Date(data.getFullYear(), data.getMonth() + 1, 0);

    var primerDiaMes = firstDay.getFullYear() + "-" + (firstDay.getMonth() +1) + "-" + firstDay.getDate();
    var ultimDiaMes = lastDay.getFullYear() + "-" + (lastDay.getMonth() + 1) + "-" + lastDay.getDate();

    return { primer_dia: primerDiaMes, ultim_dia: ultimDiaMes };
};

const validateToken = (async (req, res, next) => {

    const accessToken = req.headers["authorization"].split(" ")[1];
    if (accessToken == null) res.sendStatus(400).send("Token not present")
    jwt.verify(accessToken, token.secret, (err, token) => {
        if (err) res.status(403).send("Token invalid")
        else {
            req.token = token
            next();
        }
    })

})

module.exports = {
    login,
    apuntarse,
    validateToken,
    getEstatGuardies
}