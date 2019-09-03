const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const constant = require('./constant')();
const tables = constant.TABLES;


const driverSchema = new Schema({

});

const driverModel=mongoose.model(tables.USER, driverSchema);
module.exports = {driverModel:driverModel};


