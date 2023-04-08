const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
    const FileView = sequelize.define('FileView', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        fileid: {
            type: DataTypes.INTEGER,
        },
        date: {
            type: DataTypes.STRING,
            defaultValue: Date.now().toString(),
        },
        userid: {
            type: DataTypes.STRING,
            defaultValue: "NONE",
        },
    });
    //adds table to db if it doesnt exist
    FileView.sync();
    return FileView;
};