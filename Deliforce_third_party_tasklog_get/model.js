const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const constant = require('./constant')();
const tables = constant.TABLES;

const taskLogSchema = new Schema({
});
const taskSchema = new Schema({});
const taskLog = mongoose.model(tables.TASK_LOG, taskLogSchema);
const task = mongoose.model('tasks', taskSchema);
module.exports = {'taskLog': taskLog, 'task': task}
