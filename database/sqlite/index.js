const logger = require('../../process-log');
const sqlite3 = require('sqlite3');

//TODO: make db

let db;

module.exports.connect = async function() {
    logger.info("opening sqlite database");
    try {
        db = await sqlite3.open({
            filename: '../../database.db',
            driver: sqlite3.cached.Database
        });
    } catch(err) {
        logger.error(err.stack || err);
    }
    logger.success("connected to database");
}


module.exports.create = async function(table, id, data) {
    
}

module.exports.remove = async function(table, id) {
    
}

module.exports.getAll = async function(table) {
    
}