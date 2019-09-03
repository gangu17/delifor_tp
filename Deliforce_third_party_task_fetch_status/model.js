const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const mongoosePaginate = require('mongoose-paginate');
const constant = require('./constant')();
const tables = constant.TABLES;
const isIt = constant.isIt;


const taskSchema = new Schema({
});

module.exports = mongoose.model('tasks', taskSchema);







