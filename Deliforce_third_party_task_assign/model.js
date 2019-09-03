const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const constant = require('./constant')();
const tables = constant.TABLES;
const isIt = constant.isIt;
const validator = require('./validator');
const role = constant.ROLE;
const roleEnum = [role.ADMIN, role.DRIVER, role.MANAGER];


//pickup & delivery or same schema
const taskPickupSchema = new Schema({
  name: {type: String},//customer name
  phone: {type: String, required: true, validate: validator.phoneValidateEmpty},//validation with countrycode
  email: {type: String, validate: validator.emailValidator},
  address: {type: Schema.Types.Mixed, required: true},
  date: {type: Date, required: true}, //pickup before data (or) delivery before
  description: {type: String},
  driver: {type: Schema.Types.ObjectId, ref: 'user'},
  team: {type: Schema.Types.ObjectId, ref: 'team'},
  isPickup : {type:Boolean , default:true},
  orderId: {type: String},
  images: Schema.Types.Mixed,
  priority: {type: Number, default: isIt.NO},//drag and drop functionality
  completedDate: {type: Date},
  rating: {type: Number},
  comment: {type: String},
  taskColor:{type:String},
  //from logic
  taskStatus: {type: Number, required: true}, //Task Status
  clientId: {type: String, required: true},
  isDeleted: {type: Number, default: isIt.NO},
  created_at: {type: Date, default: Date.now},
  businessType: {type: Number, required: true},
  settings: {type: Schema.Types.Mixed, required: true},
  delay: {type: Number, default: isIt.NO, required: true},
  timezone: String
});

const taskLogSchema = new Schema({
  user: {type: String},
  role: {type: Number, required: true, enum: roleEnum},
  taskStatus: {type: String,required:true},//task log status
  driverName: {type: String},
  taskId: {type: String, required:true},
  /*isCreate: {type: Number, default: isIt.NO},*/
  //from logic
  clientId: {type: String, required: true},
  isDeleted: {type: Number, default: isIt.NO},
  created_at: {type: Date, default: Date.now},
  timezone: String
});


// Setting
const settingSchema = new Schema({
  businessType: {type: Number, required: true},
  isCurrent: {type: Boolean, required: true},
  autoAllocation: Schema.Types.Mixed,
  notifications: Schema.Types.Mixed,
  actionBlock: Schema.Types.Mixed,
  acknowledgementType: Schema.Types.Mixed,
  clientId: {type: String, required: true}
});

const customerSchema = new Schema({
  name: {type: String},
  phone: {type: String, required: true, validate: validator.phoneValidateEmpty},
  email: {type: String, validate: validator.emailValidator},
  address: {type: Schema.Types.Mixed, required: true},
  //from logic
  clientId: {type: String, required: true},
  isDeleted: {type: Number, default: isIt.NO},
  created_at: {type: Date, default: Date.now}
});


const userSchema = new Schema({
  driverStatus: {type: Number},
});

let webhookSchema = new Schema({});


const customerModel = mongoose.model(tables.CUSTOMER, customerSchema);
const settingModel = mongoose.model(tables.SETTING, settingSchema);
const tasklogModel = mongoose.model(tables.TASK_LOG, taskLogSchema);
const userModel = mongoose.model(tables.USER, userSchema);
const webhookModel = mongoose.model('webhooks', webhookSchema);
const taskModel = mongoose.model('tasks', taskPickupSchema);


module.exports = {
  task: taskModel, customerModel: customerModel,
  settingModel: settingModel, tasklogModel: tasklogModel, userModel: userModel, webhook: webhookModel
};
