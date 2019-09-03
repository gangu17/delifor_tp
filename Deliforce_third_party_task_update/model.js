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
    isPickup: {type: Boolean, default: true},
    orderId: {type: String},
    images: Schema.Types.Mixed,
    priority: {type: Number, default: isIt.NO},//drag and drop functionality
    completedDate: {type: Date},
    rating: {type: Number},
    comment: {type: String},
    taskColor: {type: String},
    dateRange: {type: Schema.Types.Mixed},
    dateRangeView: {type: Schema.Types.Mixed},
    isRecur:{type: Boolean},
    recurringObj: {type: Schema.Types.Mixed},
    isMobileListing: {type: Boolean},
    recurTaskStatus: {type: Number}, //Task Status
    isTaskListing:{type: Boolean },
    //from logic
    taskStatus: {type: Number, required: true}, //Task Status
    clientId: {type: String, required: true},
    isDeleted: {type: Number, default: isIt.NO},
    created_at: {type: Date, default: Date.now},
    businessType: {type: Number, required: true},
    settings: {type: Schema.Types.Mixed, required: true},
    delay: {type: Number, default: isIt.NO, required: true},
    timezone: String,
    isTaskListing:{type: Boolean},
    isMobileListing: {type: Boolean}
});


const taskAppointmentSchema = new Schema({
    name: {type: String},//customer name
    phone: {type: String, required: true, validate: validator.phoneValidateEmpty},//validation with countrycode
    email: {type: String, validate: validator.emailValidator},
    address: {type: Schema.Types.Mixed, required: true},
    date: {type: Date, required: true}, //startDate
    endDate: {type: Date, required: true},
    description: {type: String},
    driver: {type: Schema.Types.ObjectId, ref: 'user'},
    team: {type: Schema.Types.ObjectId, ref: 'team'},
    isPickup: {type: Boolean, default: true},
    orderId: {type: String},
    images: Schema.Types.Mixed,
    priority: {type: Number, default: isIt.NO},//drag and drop functionality
    completedDate: {type: Date},
    rating: {type: Number},
    comment: {type: String},
    taskColor: {type: String},
    dateRange: {type: Schema.Types.Mixed},
    dateRangeView: {type: Schema.Types.Mixed},
    isRecur:{type: Boolean},
    recurringObj: {type: Schema.Types.Mixed},
    isMobileListing: {type: Boolean},
    recurTaskStatus: {type: Number}, //Task Status
    isTaskListing:{type: Boolean },
    //from logic
    taskStatus: {type: Number, required: true}, //Task Status
    clientId: {type: String, required: true},
    isDeleted: {type: Number, default: isIt.NO},
    created_at: {type: Date, default: Date.now},
    businessType: {type: Number, required: true},
    settings: {type: Schema.Types.Mixed, required: true},
    delay: {type: Number, default: isIt.NO, required: true},
    timezone: String,
    isTaskListing:{type: Boolean},
    isMobileListing: {type: Boolean}
});


const taskWorkForceSchema = new Schema({
    name: {type: String},//customer name
    phone: {type: String, required: true, validate: validator.phoneValidateEmpty},//validation with countrycode
    email: {type: String, validate: validator.emailValidator},
    address: {type: Schema.Types.Mixed, required: true},
    date: {type: Date, required: true}, //start date
    endDate: {type: Date, required: true},
    description: {type: String},
    driver: {type: Schema.Types.ObjectId, ref: 'user'},
    team: {type: Schema.Types.ObjectId, ref: 'team'},
    isPickup: {type: Boolean, default: true},
    orderId: {type: String},
    images: Schema.Types.Mixed,
    priority: {type: Number, default: isIt.NO},//drag and drop functionality
    completedDate: {type: Date},
    rating: {type: Number},
    comment: {type: String},
    taskColor: {type: String},
    dateRange: {type: Schema.Types.Mixed},
    dateRangeView: {type: Schema.Types.Mixed},
    isRecur:{type: Boolean},
    recurringObj: {type: Schema.Types.Mixed},
    isMobileListing: {type: Boolean},
    recurTaskStatus: {type: Number}, //Task Status
    isTaskListing:{type: Boolean },
    //from logic
    taskStatus: {type: Number, required: true}, //Task Status
    clientId: {type: String, required: true},
    isDeleted: {type: Number, default: isIt.NO},
    created_at: {type: Date, default: Date.now},
    businessType: {type: Number, required: true},
    settings: {type: Schema.Types.Mixed, required: true},
    delay: {type: Number, default: isIt.NO, required: true},
    timezone: String,
    isTaskListing:{type: Boolean},
    isMobileListing: {type: Boolean}
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

const smsGateWaySchema = new Schema({});

const teamSchema = new Schema({});


const smsLogSchema = new Schema({
    messageSid: {type: String},
    from: {type: String},
    to: {type: String},
    content: {type: String},
    contentSegments: {type: Number},
    price: {type: mongoose.Decimal128},
    priceUnit: {type: String},
    dateSent: {type: Date},
    status: {type: String},
    clientId: {type: String},
});

const customerModel = mongoose.model(tables.CUSTOMER, customerSchema);
const settingModel = mongoose.model(tables.SETTING, settingSchema);
const tasklogModel = mongoose.model(tables.TASK_LOG, taskLogSchema);
const userModel = mongoose.model(tables.USER, userSchema);
const webhookModel = mongoose.model('webhooks', webhookSchema);
const smsGateWayModel = mongoose.model('smsgateways', smsGateWaySchema);
const smsLogModel = mongoose.model('smsLogs', smsLogSchema);
const teamModel = mongoose.model('teams', teamSchema);



function getTaskModel(businessType) {
    let taskModel;
    delete  mongoose.connection.models[tables.TASK];
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
    task: {getTaskModel: getTaskModel},
    customerModel: customerModel,
    settingModel: settingModel,
    tasklogModel: tasklogModel,
    userModel: userModel,
    webhook: webhookModel,
    smsGateWayModel: smsGateWayModel,
    smsLogModel: smsLogModel,
    teamModel: teamModel
};
