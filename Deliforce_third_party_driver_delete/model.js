const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const constant = require('./constant')();
const role = constant.ROLE;
const isIt = constant.isIt;
const tables = constant.TABLES;
const driverS = constant.DRIVER_STATUS;


const driverSchema = new Schema({
  name: {type: String, required: true},
  lastName: {type: String},
  email: {type: String, required: true},//cognito validation
  phone: {type: String, required: true},//cognito validation(+91 32323)
  password: {type: String, required: true},//cognito min 8 char ,alpha(upper,lower) numeric, special characterassignTeam: {type :Schema.Types.ObjectId , ref:'team' , required:true},
  assignTeam: {type: Schema.Types.ObjectId, ref: tables.TEAM, required: true},
  notes: {type: String},
  image: {type: String},
  transportType: {type: Number},
  transportDesc: {type: String},
  licencePlate: {type: String},
  kolor: {type: String},
  currentLocation: Schema.Types.Mixed,
  //from logic
  userRole: {type: Number, required: true},
  user: {type: String, required: true},
  role: {type: Number, required: true, default: role.DRIVER},//Role constant -3
  clientId: {type: String, required: true}, //cognito sub of admin
  driverStatus: {type: Number, default: driverS.FIRST_LOGIN}, // DRIVERSTATUS
  isDeleted: {type: Number, default: isIt.NO},
  cognitoSub: {type: String, required: true},
  created_at: {type: Date, default: Date.now}
});


const taskSchema = new Schema({});

const userPlansSchema= new Schema({
  clientId:{type:String},
  agentCount:{type:Number}
});

const TaskModel = mongoose.model(tables.TASK,taskSchema);
const driverModel = mongoose.model(tables.DRIVER,driverSchema);
const userPlansModel= mongoose.model('userplans',userPlansSchema)

module.exports={TaskModel:TaskModel,driverModel:driverModel,UserPlansModel:userPlansModel};













