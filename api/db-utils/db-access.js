const connection = require('./db-connection.js')



const getPlantilla = (async (req, res) => {

    connection.query("select * from plantilla_guardia where estat != 'eliminat';",
        (err, result) => {
            if (err) {
                res.status(400).send("Error al obtenir plantilla guardia");
            }
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,PUT,OPTIONS');
            res.status(200).send({
                "resultat": { "dades": result }
            })
        })
});
const getTreballador = (async (req, res) => {
    const DNI = req.query.dni;
    connection.query("select * from treballador where dni = '"+DNI+"'", (err, result) => {
        if (err) {
            res.status(400).send('Error al obtenir treballdors')
        }
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,OPTIONS');
        res.status(200).send({
            "resultat": { "dades": result }
        })
    })
});
const getTreballadors = (async (req, res) => {
    
    connection.query("select * from treballador where estat != 'eliminat' " , (err, result) => {
        if (err) {
            res.status(400).send('Error al obtenir treballdors')
        }
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,OPTIONS');
        res.status(200).send({
            "resultat": { "dades": result }
        })
    })
})

const getCategories = (async (req, res) => {
    connection.query("select nom from categoria where estat != 'eliminat'", (err, result) => {
        if (err) {
            res.status(400).send('Error al obternir categoria')
        }
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,OPTIONS');
        res.status(200).send({
            "resultat": { "dades": result }
        });
    })
});

const getTorns = (async (req, res) => {
    connection.query("select nom from torn where estat != 'eliminat'", (err, result) => {
        if (err) {
            res.status(400).send('Error al obternir categoria')
        }
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,OPTIONS');
        res.status(200).send({
            "resultat": { "dades": result }
        });
    })
});

const getUnitats = (async (req, res) => {
    connection.query("select nom from unitat where estat != 'eliminat'", (err, result) => {
        if (err) {
            res.status(400).send('Error al obternir categoria')
        }
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,OPTIONS');
        res.status(200).send({
            "resultat": { "dades": result }
        });
    })
});
const getFestius = (async (req, res) => {
    connection.query("select * from festius where estat != 'eliminat'", (err, result) => {
        if (err) {
            res.status(400).send('Error al obternir categoria')
        }
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,OPTIONS');
        res.status(200).send({
            "resultat": { "dades": result }
        });
    })
});

const getGuardiesTreballador = (async (req, res) => {
    const DADES_GuardiesTreballador = 'gx.id, gx.estat_guardia, gx.estat';
    const DADES_Guardia = ',g.id, g.data_guardia, g.unitat, g.torn, g.categoria';

    const DADES = DADES_GuardiesTreballador+" "+DADES_Guardia;
    const DNI = req.query.dni;
    let sql = "select "+ DADES +" from guardies_x_treballador as gx JOIN guardies as g on gx.id = g.id where gx.estat != 'eliminat' and gx.dni_treballador ='"+DNI+"' order by g.data_guardia";
    connection.query(sql, (err, result) => {
        if (err) {
            res.status(400).send('Error al obternir guardes per treballador')
        }
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,OPTIONS');
        res.status(200).send({
            "resultat": { "dades": result }
        });
    })
});

const getAgendaTreballador = (async (req, res) => {
    const DADES_GuardiesTreballador = 'gx.id, gx.estat_guardia, gx.estat';
    const DADES_Guardia = ',g.id, g.data_guardia, g.unitat, g.torn, g.categoria';

    const DADES = DADES_GuardiesTreballador+" "+DADES_Guardia;
    const DNI = req.query.dni;
    const DATA = req.query.data;

    let sql = "select "+ DADES +" from guardies_x_treballador as gx JOIN guardies as g on gx.id = g.id where gx.estat != 'eliminat' and gx.dni_treballador ='"+DNI+"' and g.data_guardia > '"+DATA+"' order by g.data_guardia";
    connection.query(sql, (err, result) => {
        if (err) {
            res.status(400).send('Error al obternir guardes per treballador')
        }
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,OPTIONS');
        res.status(200).send({
            "resultat": { "dades": result }
        });
    })
});

const getHistorialTreballador = (async (req, res) => {
    const DADES_GuardiesTreballador = 'gx.id, gx.estat_guardia, gx.estat';
    const DADES_Guardia = ',g.id, g.data_guardia, g.unitat, g.torn, g.categoria';

    const DADES = DADES_GuardiesTreballador+" "+DADES_Guardia;
    const DNI = req.query.dni;
    const DATA = req.query.data;

    let sql = "select "+ DADES +" from guardies_x_treballador as gx JOIN guardies as g on gx.id = g.id where gx.estat != 'eliminat' and gx.dni_treballador ='"+DNI+"' and g.data_guardia < '"+DATA+"' order by g.unitat";
    connection.query(sql, (err, result) => {
        if (err) {
            res.status(400).send('Error al obternir guardes per treballador')
        }
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,OPTIONS');
        res.status(200).send({
            "resultat": { "dades": result }
        });
    })
});

const updateFestiu = (async (req, res) => {
    let sql = `UPDATE festius SET estat = ? WHERE dia = ?`;
    connection.query(sql,[req.body.status,req.body.dia], (error, results, fields) => {
      if (error) throw error;
      res.send({"d":req.body.status});
    });
});
const insertFestiu = (async (req, res) => {
    try {
        let sql = `INSERT into festius(dia, estat) VALUES (?, ?)`;
        connection.query(sql,[req.body.dia,req.body.estat], (error, results, fields) => {
        if (error) {
            if(error.code === 'ER_DUP_ENTRY'){
                let updateSql = `UPDATE festius SET estat = ? WHERE dia = ?`;
                connection.query(updateSql, [req.body.estat, req.body.dia], (error, results) => {
                    if (error) throw error;
                    res.send({"message": "El valor del campo estat ha sido actualizado"});
                });
            } 
            else {
                throw error;
            }
        }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Ha ocurrido un error al insertar el festiu" });
    }
});


module.exports = { getPlantilla, getTreballadors, getTreballador, getCategories, getGuardiesTreballador, getAgendaTreballador, getTorns, getUnitats,getHistorialTreballador,getFestius,updateFestiu, insertFestiu };

