const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const constant = require('./constant')();
const tables = constant.TABLES;

const mongoosePaginate = require('mongoose-paginate');
const taskSchema = new Schema({});

const teamSchema = new Schema({});

mongoose.model(tables.TEAM, teamSchema);

taskSchema.plugin(mongoosePaginate);
const userSchema = new Schema({});
const settingSchema = new Schema({});
const userModel = mongoose.model(tables.USER, userSchema);
const taskModel = mongoose.model(tables.TASK, taskSchema);
const settingModel = mongoose.model(tables.SETTING, settingSchema);
module.exports = {task: taskModel, user: userModel, setting: settingModel};
