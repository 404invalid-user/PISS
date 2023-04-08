const logger = require('../../utils/process-log');
const mongoose = require('mongoose');


const schemas = {
    user: require('./schemas/user'),
    session: require('./schemas/session'),
    file: require('./schemas/file'),
    analytic: require('./schemas/analytic')
};

module.exports.connect = async function() {
    logger.info("connecitng to mongodb");
    try {
        await mongoose.connect(process.env.dbConnectURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    } catch(error) {
        logger.error(error.stack || error);
    };
    return logger.success("connected to database");
}


module.exports.create = async function(table, id, data) {
    await schemas[table].create(data);
    return;
}

module.exports.remove = async function(table, id) {
    await schemas[table].findOneAndRemove({id: id});
    return;
    
}

module.exports.getAll = async function(table) {
    return await schemas[table].find({});
}
