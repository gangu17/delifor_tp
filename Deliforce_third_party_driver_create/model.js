const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const constant = require('./constant')();
const isIt = constant.isIt;
const driverS = constant.DRIVER_STATUS;
const tables = constant.TABLES;
const role = constant.ROLE;
var securePin = require("secure-pin");


const driverSchema = new Schema({
    name: {type: String, required: true},
    lastName: {type: String},
    email: {type: String},//cognito validation
    phone: {type: String, required: true},//cognito validation(+91 32323)
    password: {type: String, required: true},//cognito min 8 char ,alpha(upper,lower) numeric, special characterassignTeam: {type :Schema.Types.ObjectId , ref:'team' , required:true},
    assignTeam: {type: Schema.Types.ObjectId, ref: tables.TEAM, required: true},
    notes: {type: String},
    driverId: {type: String, required: true},
    image: {type: String},
    transportDesc: {type: String},
    licencePlate: {type: String},
    kolor: {type: String},
    location: {
        type: {type: String},
        coordinates: []
    },
    //from logic
    resetPasswordToken: {type: String},
    resetPasswordExpires: {type: Date},
    userRole: {type: Number, required: true},
    user: {type: String, required: true},
    role: {type: Number, required: true, default: role.DRIVER},//Role constant -3
    clientId: {type: String, required: true}, //cognito sub of admin
    driverStatus: {type: Number, default: driverS.OFFLINE}, // DRIVERSTATUS
    isDeleted: {type: Number, default: isIt.NO},
    cognitoSub: {type: String, required: true},
    created_at: {type: Date, default: Date.now},
    settings: {
        transportType: {type: Number},
        ringtone: {type: Number, default: 1},
        vibration: {type: Number, default: 1},              // types of vibration 1 for long 2 for system
        repeat: {type: Boolean, default: false},
        language: {type: Number, default: 1},
        navigation: {type: Number, default: 1},
        mapStyle: {type: Number, default: 1},
        showTraffic: {type: Boolean, default: false},
        powerSavingModel: {type: Boolean, default: false},
        navigationHelper: {type: Boolean, default: false},
    }
});

driverSchema.index({location: '2dsphere'});

const userPlansSchema = new Schema({
    clientId: {type: String},
    agentCount: {type: Number}
});

const smsGateWaySchema = new Schema({});


const templatesSchema = new Schema({
    action: {type: String, required: true},
    email: {type: String, required: true},
    email_subject: {type: String, required: true},
    sms: {type: String, require: true},
    fields: [String]
});
const teamSchema = new Schema({});

const Driver = mongoose.model(tables.DRIVER, driverSchema);
const UserPlans = mongoose.model('userplans', userPlansSchema);
//const driverSettingModel = mongoose.model('driverSettings', driverSettingSchema);
const templateModel = mongoose.model('template', templatesSchema);
const teamModel = mongoose.model('teams', teamSchema);
const smsGateWayModel = mongoose.model('smsgateways', smsGateWaySchema);


module.exports = {
    'DRIVER': Driver, 'USERPLANS': UserPlans, template: templateModel, 'TEAM': teamModel, smsGateWay: smsGateWayModel
};












