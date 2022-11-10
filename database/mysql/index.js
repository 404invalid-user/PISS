const logger = require('../../process-log');

//yeah i know it says mysql but this drive works soo why yee it?
const mariadb = require('mariadb');

let connection;
module.exports.connect = async function() {
    logger.info("connecting to mysql database");
    connection = await mariadb.createConnection(process.env.mysql);

    await connection.connect(function(err) {
        if (err) {
            return logger.error(err.stack || err);
        }
        logger.success("connected to database as id " + connection.threadId);
    });

    //make user table
    if (process.env.firstStart == true) {
        await connection.query("CREATE TABLE if not exists user (id VARCHAR(50), username VARCHAR(50), email VARCHAR(50), password VARCHAR(255), discordid INT, admin INT, createddate VARCHAR(255));",
        function (error, results, fields) {
            if (error) return logger.error(error.stack || error);
            logger.info("created table users if not exists");
        });
        
        //make session table
        await connection.query("CREATE TABLE if not exists session (id VARCHAR(50), userid VARCHAR(50), token VARCHAR(50), ip VARCHAR(255), location VARCHAR(255), devicetype VARCHAR(255), active VARCHAR(255), icon VARCHAR(255), createddate VARCHAR(255), lastused VARCHAR(255));",
        function (error, results, fields) {
            if (error) return logger.error(error.stack || error);
            logger.info("created table sessions if not exists");
        });
        
        //make file tabl
        await connection.query("CREATE TABLE if not exists file (id VARCHAR(50), userid VARCHAR(50), path VARCHAR(50), uploadsession VARCHAR(255), filetype VARCHAR(5), createddate VARCHAR(255));",
        function (error, results, fields) {
            if (error) return logger.error(error.stack || error);
            logger.info("created table file if not exists");
        });
    }
    return;
}


module.exports.create = async function(table, id, data) {
    if (table == 'user') {

    } else if (table == 'file') {

    } else if (table == 'session') {

    } else if (table == 'analytic') {

    }

}

module.exports.remove = async function(table, id) {
    
}

module.exports.getAll = async function(table) {
    
}