const logger = require('../utils/process-log');

let db;
if (process.env.dbType === 'mysql') {
    db = require('./mysql/index');
} else if (process.env.dbType === 'sqlite') {
    db = require('./sqlite/index');
} else if (process.env.dbType === 'mongodb') {
    db = require('./mongodb/index');
} else if (process.env.dbType === 'installer') {
    logger.warn("database is set to installer please head over to /install to setup the server");
} else {
    logger.crash("an invalid database type was provided please consult our help page to fix it");
    process.exit()
}

module.exports = db;