const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const constant = require('./constant')();
const tables = constant.TABLES;
const isIt = constant.isIt;
const role = constant.ROLE;
const driverS = constant.DRIVER_STATUS;

const driverSchema = new Schema({
});


const teamSchema = new Schema({

});


const driverModel=mongoose.model(tables.USER, driverSchema);
const teamModel=mongoose.model(tables.TEAM, teamSchema);
module.exports = {driverModel:driverModel,teamModel:teamModel};


