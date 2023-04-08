const fs = require('fs');
const { Sequelize } = require('sequelize');
const processlog = require('../../utils/process-log');

const sequelize = new Sequelize(process.env.MYSQL_DATABASE_URL);
const schemas = {
    File: require('./schemas/File')(sequelize),
    FileView: require('./schemas/FileView')(sequelize),
    User: require('./schemas/User')(sequelize),
    UserSession: require('./schemas/UserSession')(sequelize),
};



/**
 * connect to the databases
 * @param {Object} params - config params.
 */
module.exports.connect = async(params) => {
    processlog.info('starting db service');

    //connect to database
    try {
        await sequelize.authenticate();
        processlog.success('Connection has been established successfully.');
    } catch (error) {
        processlog.error('Unable to connect to the database:', error);
        process.exit();
    }
    return true;
}

/**
 * 
 * @param {Object} values - find one doc by the values you want to find by eg usename id
 * @returns {Object}
 */
async function findOneByValues(table, values) {
    let result = await schemas[table].findOne({ where: values });;
    if (!result) return null;
    result['save'] = async function() {
        const dbresult = await schemas[table].findOne({ where: values });
        let toUpdate = {};

        for (const o in result) {
            if (result.hasOwnProperty(o)) {
                if (o !== 'save') {
                    if (dbresult[o] != result[o]) {
                        toUpdate[o] = result[o];
                    }
                }
            }
        }
        //update data in database
        try {
            await schemas[table].update(toUpdate, { where: values });
        } catch (err) {
            processlog.error(err.stack || err);
            return false;
        }
        return true;
    }
    return result;
}

/**
 * 
 * @param {Object} values - find all docs by the values you want to find by eg usename id
 * @returns {Object}
 */
async function findAllByValues(table, values) {
    let result = await schemas[table].findAll({ where: values });;
    if (!result) return null;
    return result;
    //TODO: save function for array of docs
    result['save'] = async function() {
        const dbresult = await schemas[table].findOne({ where: values });
        let toUpdate = {};

        for (const o in result) {
            if (result.hasOwnProperty(o)) {
                if (o !== 'save') {
                    if (dbresult[o] != result[o]) {
                        toUpdate[o] = result[o];
                    }
                }
            }
        }
        //update data in database
        try {
            await schemas[table].update(toUpdate, { where: values });
        } catch (err) {
            processlog.error(err.stack || err);
            return false;
        }
        return true;
    }
    return result;
}


/**
 * lookup a document in the cache and fallback to mongo if its not there
 * @param {String} table - the table you want to lookup data in
 * @param {String} id - the id of the data you want to lookup
 * @returns {Object} 
 */
module.exports.lookup = async(table, key) => {
    return await findOneByValues(table, { id: key });
}


/**
 * create a new document in the database and cache it
 * @param {String} table - the table that you want to create data in
 * @param {String} id - the id you would like to use 
 * @param {Object} data - rest of the data
 * @returns 
 */
module.exports.create = async(table, id, data) => {
    if (schemas[table] == null || schemas[table] == undefined) throw "Error: " + table + " is not a valid table name";
    data.id = id;
    const createData = await schemas[table].create(data);
    return true;
}


/**
 * get all documents in the cached table
 * @param {String} table 
 * @returns {Array}
 */
module.exports.getAll = async(table) => {
    const data = await schemas[table].getAll();
    return data;
}


/**
 * delete a document from the cache and database
 * @param {String} table 
 * @param {String} id 
 * @returns {Boolean}
 */
module.exports.delete = async(table, id) => {
    if (schemas[table] == null || schemas[table] == undefined) throw "Error: " + table + " is not a valid table name";
    try {
        await schemas[collection].destroy({ where: { id } });
    } catch (err) {
        processlog.error(err.stack || err);
        throw "Error: could not delete from database"
    }
    return true;
}



//user functions


module.exports.getUserById = async function(id) {
    return await findOneByValues("User", { id: id });
}

module.exports.getUserByUsername = async function(username) {
    return await findOneByValues('User', { username: username });
}
module.exports.getUserByEmail = async function(email) {
    return await findOneByValues('User', { email: email });
}

module.exports.getUserByDiscordId = async function(discordid) {
    return await findOneByValues('User', { discordid: discordid });
}


module.exports.getUserSessions = async function(userid) {
    return await findAllByValues('UserSession', { userid: userid });
}

module.exports.getUserSession = async function(userid, token) {
    return await findAllByValues('UserSession', { userid: userid, token: token });
}