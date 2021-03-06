const { connection } = require('../data-access/connection');
const { DataTypes } = require('sequelize');

module.exports = connection.define('Group',{
    id:{
        primaryKey: true,
        type: DataTypes.NUMBER,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING
    },
    permissions:{
        type:DataTypes.ARRAY(DataTypes.STRING)
    }
},{
    tableName:'Group',
    freezeTableName:true,
    timestamps:false
})