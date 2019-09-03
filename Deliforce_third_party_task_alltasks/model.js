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

const permissionSchema = new Schema({
  principalType: {type: Number, required: true},
  principalId: {type: String, required: true},
  moduleAction: {type: String, required: true}, //'task_edit'
  grant: {type: Boolean}
});

mongoose.model(tables.TEAM, teamSchema);

taskSchema.plugin(mongoosePaginate);
taskSchema.index({date:1,taskStatus:1,clientId:1,businessType:1,isDeleted:1});
const permissionModel = mongoose.model(tables.PERMISSION, permissionSchema);
const userSchema = new Schema({});
const settingSchema = new Schema({});
const userModel = mongoose.model(tables.USER, userSchema);
const taskModel = mongoose.model(tables.TASK, taskSchema);
const settingModel = mongoose.model(tables.SETTING, settingSchema);
module.exports = {task: taskModel, user: userModel, setting: settingModel, permission :permissionModel };
