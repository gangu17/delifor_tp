const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const constant = require('./constant');
const tables = constant.TABLES;
const isIt = constant.isIt;
const validator = require('./validator');
const role = constant.ROLE;
const roleEnum = [role.ADMIN, role.DRIVER, role.MANAGER];


//pickup & delivery or same schema
const taskPickupSchema = new Schema({
  name: {type: String, required: true},//customer name
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
  priority: {type: Number, default: 0},//drag and drop functionality
  completedDate: {type: Date},
  color: {type: String},
  //from logic
  taskId: {type: String, required: true, default: generateRandam},
  userRole: {type: Number, required: true},
  user: {type: String, required: true},
  taskStatus: {type: Number, required: true}, //Task Status
  clientId: {type: String, required: true},
  isDeleted: {type: Number, default: isIt.NO},
  created_at: {type: Date, default: Date.now},
  businessType: {type: Number, required: true},
  settings: {type: Schema.Types.Mixed, required: true},
  delay: {type: Number, default: isIt.NO, required: true}
});

function generateRandam() {
  return Math.floor(Math.random() * 9000) + 1000;
}


const taskAppointmentSchema = new Schema({
  name: {type: String, required: true},//customer name
  phone: {type: String, required: true, validate: validator.phoneValidateEmpty},//validation with countrycode
  email: {type: String, validate: validator.emailValidator},
  address: {type: Schema.Types.Mixed, required: true},
  date: {type: Date, required: true}, //startDate
  endDate: {type: Date, required: true},
  description: {type: String},
  driver: {type: Schema.Types.ObjectId, ref: 'user'},
  team: {type: Schema.Types.ObjectId, ref: 'team'},
  orderId: {type: String},
  images: Schema.Types.Mixed,
  priority: {type: Number, default: 0},//drag and drop functionality
  completedDate: {type: Date},
  color: {type: String},
  //from logic
  taskId: {type: String, required: true, default: generateRandam},
  userRole: {type: Number, required: true},
  user: {type: String, required: true},
  taskStatus: {type: Number, required: true}, //Task Status
  clientId: {type: String, required: true},
  isDeleted: {type: Number, default: isIt.NO},
  created_at: {type: Date, default: Date.now},
  businessType: {type: Number, required: true},
  settings: {type: Schema.Types.Mixed, required: true},
  delay: {type: Number, default: isIt.NO, required: true}
});


const taskWorkForceSchema = new Schema({
  name: {type: String, required: true},//customer name
  phone: {type: String, required: true, validate: validator.phoneValidateEmpty},//validation with countrycode
  email: {type: String, validate: validator.emailValidator},
  address: {type: Schema.Types.Mixed, required: true},
  date: {type: Date, required: true}, //start date
  endDate: {type: Date, required: true},
  description: {type: String},
  driver: {type: Schema.Types.ObjectId, ref: 'user'},
  team: {type: Schema.Types.ObjectId, ref: 'team'},
  orderId: {type: String},
  images: Schema.Types.Mixed,
  priority: {type: Number, default: 0},//drag and drop functionality
  completedDate: {type: Date},
  color: {type: String},
  //from logic
  taskId: {type: String, required: true, default: generateRandam},
  userRole: {type: Number, required: true},
  user: {type: String, required: true},
  taskStatus: {type: Number, required: true}, //Task Status
  clientId: {type: String, required: true},
  isDeleted: {type: Number, default: isIt.NO},
  created_at: {type: Date, default: Date.now},
  businessType: {type: Number, required: true},
  settings: {type: Schema.Types.Mixed, required: true},
  delay: {type: Number, default: isIt.NO, required: true}
});

const taskLogSchema = new Schema({
  user: {type: String},
  role: {type: Number, required: true, enum: roleEnum},
  taskStatus: {type: String, required: true},//task log status
  driverName: {type: String},
  taskId: {type: String, required: true},
  /*isCreate: {type: Number, default: isIt.NO},*/
  //from logic
  clientId: {type: String, required: true},
  isDeleted: {type: Number, default: isIt.NO},
  created_at: {type: Date, default: Date.now}
});


// Setting

var settingSchema = new Schema({
  businessType: {type: Number},
  isCurrent: {type: Boolean},
  autoAllocation: Schema.Types.Mixed,
  notifications: Schema.Types.Mixed,
  accountSettings: Schema.Types.Mixed,
  enableAutoAllocation: Schema.Types.Mixed,
  category: Schema.Types.Mixed,
  apiKey: {type: String},
  clientId: {type: String},
  actionBlock: Schema.Types.Mixed,
  acknowledgementType: Schema.Types.Mixed
});

const customerSchema = new Schema({
  name: {type: String, required: true},
  phone: {type: String, required: true, validate: validator.phoneValidateEmpty},
  email: {type: String, validate: validator.emailValidator},
  address: {type: Schema.Types.Mixed, required: true},
  //from logic
  clientId: {type: String, required: true},
  isDeleted: {type: Number, default: isIt.NO},
  created_at: {type: Date, default: Date.now},
  color: {type: String}
});


const userSchema = new Schema({
  name: {type: String, required: true},
  lastName: {type: String},
  email: {type: String, required: true},//cognito validation
  phone: {type: String, required: true}
});


const customerModel = mongoose.model(tables.CUSTOMER, customerSchema);
const settingModel = mongoose.model('setting', settingSchema);
const tasklogModel = mongoose.model(tables.TASK_LOG, taskLogSchema);
const userModel = mongoose.model(tables.USER, userSchema);


function getTaskModel(businessType) {
  let taskModel;
  delete  mongoose.connection.models[tables.TASK];
  const business = constant.BUSINESS_TYPE;
  if (businessType === business.PICKUP) {
    console.log('pickup');
    taskModel = mongoose.model(tables.TASK, taskPickupSchema);
  } else if (businessType === business.APPOINTMENT) {
    console.log('APPOINTMENT');
    taskModel = mongoose.model(tables.TASK, taskAppointmentSchema);
  } else if (businessType === business.FIELD) {
    console.log('FIELD');
    taskModel = mongoose.model(tables.TASK, taskWorkForceSchema);
  } else {
    console.log('null');
    taskModel = null;
  }
  return taskModel;
}

module.exports = {
  task: {getTaskModel: getTaskModel}, customerModel: customerModel,
  settingModel: settingModel, tasklogModel: tasklogModel, userModel: userModel
};
