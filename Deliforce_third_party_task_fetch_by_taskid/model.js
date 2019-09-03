const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const constant = require('./constant')();
const tables = constant.TABLES;

const mongoosePaginate = require('mongoose-paginate');
const taskSchema = new Schema({
  driver: {type: Schema.Types.ObjectId, ref: tables.USER},
});

const teamSchema = new Schema({
  teamName: {type: String, required: true}, //UNIQUE tested in backend
});

mongoose.model(tables.TEAM, teamSchema);

taskSchema.plugin(mongoosePaginate);
const userSchema = new Schema({});
const settingSchema = new Schema({});
const userModel = mongoose.model(tables.USER, userSchema);
const taskModel = mongoose.model(tables.TASK, taskSchema);
const settingModel = mongoose.model(tables.SETTING, settingSchema);
module.exports = {task: taskModel, user: userModel, setting: settingModel};
