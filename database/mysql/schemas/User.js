const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        avatar: {
            type: DataTypes.STRING
        },
        discordid: {
            type: DataTypes.STRING,
            defaultValue: "NONE"
        },
        username: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        lan: {
            type: DataTypes.STRING,
            defaultValue: "EN"
        },
        created: {
            type: DataTypes.STRING,
            defaultValue: Date.now().toString(),
        },
        admin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        instanceowner: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
    });
    //adds table to db if it doesnt exist
    User.sync();
    return User;
};