const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const constant = require('./constant')();
const tables = constant.TABLES;
const isIt = constant.isIt;
const role = constant.ROLE;


const managerSchema = new Schema({
  name: {type: String, required: true},
  lastName: {type: String},
  email: {type: String, required: true},//cognito validation
  phone: {type: String, required: true},//cognito validation(+91 32323)
  password: {type: String, required: true},//cognito min 8 char ,alpha(upper,lower) numeric, special characterassignTeam: {type :Schema.Types.ObjectId , ref:'team' , required:true},
  //managers:[{type:Schema.Types.ObjectId,ref:'user'}],
  teams: [{type: Schema.Types.ObjectId, ref: 'team', required: true}],
  permissions: {type: Schema.Types.Mixed},//ACL
  color: {type: String},
  //from logic
  resetPasswordToken: {type: String},
  resetPasswordExpires: {type: Date},
  role: {type: Number, required: true, default: role.MANAGER},//Role constant - 2
  clientId: {type: String, required: true},
  isDeleted: {type: Number, default: isIt.NO},
  cognitoSub: {type: String, required: true},
  created_at: {type: Date, default: Date.now},
  managerId: {type: String}
});

const permissionSchema = new Schema({
  principalType: {type: Number, required: true},
  principalId: {type: String, required: true},
  moduleAction: {type: String, required: true},
  grant: {type: Boolean}
});

const teamSchema = new Schema({

});


const managerModel = mongoose.model(tables.USER, managerSchema);
const permssionModel = mongoose.model(tables.PERMISSION, permissionSchema);
const teamModel = mongoose.model(tables.TEAM, teamSchema);

module.exports = {manager: managerModel, permission: permssionModel, team: teamModel};





