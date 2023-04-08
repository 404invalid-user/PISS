const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
    const UserSession = sequelize.define('UserSession', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userid: {
            type: DataTypes.INTEGER
        },
        icon: {
            type: DataTypes.STRING
        },
        createddate: {
            type: DataTypes.STRING,
            defaultValue: Date.now().toString()
        },
        lastused: {
            type: DataTypes.STRING,
            defaultValue: Date.now().toString()
        },
        token: {
            type: DataTypes.STRING
        },
        ip: {
            type: DataTypes.STRING
        },
        region: {
            type: DataTypes.STRING
        },
        browser: {
            type: DataTypes.STRING
        },
        //if this token is for sharex (can only upload and delete uploads)
        uploader: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
    });
    //adds table to db if it doesnt exist
    UserSession.sync();
    return UserSession;
};