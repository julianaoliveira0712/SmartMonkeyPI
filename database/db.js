// onde fica as informações de banco de dados, caso for necessários nessa aplicação.
let db = require("mssql");

let config = {
    user: "admsmart",
    password: "MonkeysBusiness02",
    server: "https://smartmonkeymonitoring.azurewebsites.net",
    database: "SmartMonkey ",
    options: {
        encrypt: true
    }
}

let g = false;

function SQLQuery(queryLine)
{
    if(g)
    {
        return global.conn.request().
        query(queryLine).
        then(results => {
            return results.recordset;
        })
    }
    else
    {
        return db.connect(config)
            .then(conn => {
                global.conn = conn;
                g = true;
                return global.conn.request().query(queryLine);
            })
            .then(results => {
                return results.recordset;
            })
    }
}

module.exports.cadastro = {
    inserirUsuario: (user) => {
        return SQLQuery(`insert into Usuario values ('${user.inputUser}', )`);
    }
}
