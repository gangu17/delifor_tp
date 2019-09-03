const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const constant = require('./constant')();
const isIt = constant.isIt;
const tables = constant.TABLES;

const taskSchema = new Schema({
  isDeleted:{type:Number,default:isIt.NO},
  taskStatus: {type: Number, required: true}
});
const userPlansSchema = new Schema({
  clientId: {type: String},
  companyName: {type: String},
  planType: {type: Number},// free-1 pack-1==2 pack-3
  agentLimit: {type: Number}, //
  taskLimit: {type: Number},
  price: {type: Number},

  taskCount: {type: Number},
  agentCount: {type: Number},
  // period:{type:Number},// 1-month 3-month 6-month
  startDate: {type: Date, default: Date.now()},
  endDate: {type: Date},
  credites: {type: Number, default: 0},
  // cardDetails:Schema.Types.Mixed, //cardNumber,expiry (mm/yy),cvv(3 digits),isCurrent:boolean, card holder name
  currency: {type: String},
  discount: {type: String, default: 0},
  coupenNumber: {type: String},
  // hasPaid: {type: Number, default: 1}

});

const notificationSchema= new Schema({
  driver: {type: mongoose.Schema.Types.ObjectId},
  name: {type: String, required: true},//customer name
  phone: {type: String, required: true},//validation with countrycode
  email: {type: String},
  address: {type: Schema.Types.Mixed, required: true},
  date: {type: Date, required: true}, //pickup before data (or) delivery before
  transportType: {type: Number},
  orderId: {type: String},
  endDate: {type: Date},
  businessType: {type: Number, required: true},
  //from logic
  taskId: {type: String},
  taskStatus: {type: Number} ,
  isPickup : {type:Boolean}
 //Task Stat

});

let webhookSchema = new Schema({});


const userModel= new Schema({
  driverStatus: {type: Number}
});

const Task = mongoose.model(tables.TASK, taskSchema);
const UserPln = mongoose.model('userplans', userPlansSchema);
const user= mongoose.model('users',userModel);
const notification = mongoose.model('notifications',notificationSchema);
const webhookModel = mongoose.model('webhooks', webhookSchema);

module.exports = {'TASK': Task, 'USERPLAN': UserPln,USER:user,'NOTIFICATIONS':notification, 'WEBHOOK':webhookModel};
