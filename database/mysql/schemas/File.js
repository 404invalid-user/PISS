const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
    const File = sequelize.define('File', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userid: {
            type: DataTypes.INTEGER,
        },
        slug: {
            type: DataTypes.STRING,
        },
        filetype: {
            type: DataTypes.STRING,
        },
        path: {
            type: DataTypes.STRING,
        },
        uploadsessionid: {
            type: DataTypes.STRING,
            defaultValue: "EN"
        },
        created:  {
            type: DataTypes.STRING,
            defaultValue: Date.now().toString(),
        },
    });
    //adds table to db if it doesnt exist
    File.sync();
    return File;
};