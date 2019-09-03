const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const constant = require('./constant')();
const tables = constant.TABLES;
const isIt = constant.isIt;
const role = constant.ROLE;
const roleEnum = [role.ADMIN, role.DRIVER, role.MANAGER];


//pickup & delivery or same schema
const taskPickupSchema = new Schema({
  name: {type: String, required: true},//customer name
  phone: {type: String, required: true},//validation with countrycode
  email: {type: String},
  address: {type: Schema.Types.Mixed, required: true},
  date: {type: Date, required: true}, //pickup before data (or) delivery before
  description: {type: String},
  driver: {type: Schema.Types.ObjectId, ref: 'user'},
  team: {type: Schema.Types.ObjectId, ref: 'team'},
  transportType: {type: Number},
  orderId: {type: String},
  images: Schema.Types.Mixed,
  priority: {type: Number, default: 0},//drag and drop functionality
  completedDate: {type: Date},
  //from logic
  taskStatus: {type: Number, required: true}, //Task Status
  clientId: {type: String, required: true},
  isDeleted: {type: Number, default: isIt.NO},
  created_at: {type: Date, default: Date.now},
  businessType: {type: Number, required: true},
  settings: {type: Schema.Types.Mixed, required: true},
  delay: {type: Number, default: isIt.NO, required: true},
  adminArray: {type: Array}
});


const taskAppointmentSchema = new Schema({
  name: {type: String, required: true},//customer name
  phone: {type: String, required: true},//validation with countrycode
  email: {type: String},
  address: {type: Schema.Types.Mixed, required: true},
  date: {type: Date, required: true}, //startDate
  endDate: {type: Date, required: true},
  description: {type: String},
  driver: {type: Schema.Types.ObjectId, ref: 'user'},
  team: {type: Schema.Types.ObjectId, ref: 'team'},
  transportType: {type: Number},
  orderId: {type: String},
  images: Schema.Types.Mixed,
  priority: {type: Number, default: 0},//drag and drop functionality
  completedDate: {type: Date},
  //from logic
  taskStatus: {type: Number, required: true}, //Task Status
  clientId: {type: String, required: true},
  isDeleted: {type: Number, default: isIt.NO},
  created_at: {type: Date, default: Date.now},
  businessType: {type: Number, required: true},
  settings: {type: Schema.Types.Mixed, required: true},
  delay: {type: Number, default: isIt.NO, required: true},
  adminArray: {type: Array}
});


const taskWorkForceSchema = new Schema({
  name: {type: String, required: true},//customer name
  phone: {type: String, required: true},//validation with countrycode
  email: {type: String},
  address: {type: Schema.Types.Mixed, required: true},
  date: {type: Date, required: true}, //start date
  endDate: {type: Date, required: true},
  description: {type: String},
  driver: {type: Schema.Types.ObjectId, ref: 'user'},
  team: {type: Schema.Types.ObjectId, ref: 'team'},
  transportType: {type: Number},
  orderId: {type: String},
  images: Schema.Types.Mixed,
  priority: {type: Number, default: 0},//drag and drop functionality
  completedDate: {type: Date},
  //from logic
  taskStatus: {type: Number, required: true}, //Task Status
  clientId: {type: String, required: true},
  isDeleted: {type: Number, default: isIt.NO},
  created_at: {type: Date, default: Date.now},
  businessType: {type: Number, required: true},
  settings: {type: Schema.Types.Mixed, required: true},
  delay: {type: Number, default: isIt.NO, required: true},
  adminArray: {type: Array}
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
  name: {type: String, required: true},
  phone: {type: String, required: true},
  email: {type: String},
  address: {type: Schema.Types.Mixed, required: true},
  //from logic
  clientId: {type: String, required: true},
  isDeleted: {type: Number, default: isIt.NO},
  created_at: {type: Date, default: Date.now}
});


const userSchema = new Schema({});


const customerModel = mongoose.model(tables.CUSTOMER, customerSchema);
const settingModel = mongoose.model(tables.SETTING, settingSchema);
const tasklogModel = mongoose.model(tables.TASK_LOG, taskLogSchema);
const userModel = mongoose.model(tables.USER, userSchema);


function getTaskModel(businessType) {
  let taskModel;
  const business = constant.BUSINESS_TYPE;
  if (businessType === business.PICKUP) {
    taskModel = mongoose.model(tables.TASK, taskPickupSchema);
  } else if (businessType === business.APPOINTMENT) {
    taskModel = mongoose.model(tables.TASK, taskAppointmentSchema);
  } else if (businessType === business.FIELD) {
    taskModel = mongoose.model(tables.TASK, taskWorkForceSchema);
  } else {
    taskModel = null;
  }
  return taskModel;
}

module.exports = {
  task: {getTaskModel: getTaskModel}, customerModel: customerModel,
  settingModel: settingModel, tasklogModel: tasklogModel, userModel: userModel
};
