const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const constant = require('./constant')();
const tables = constant.TABLES;
const isIt = constant.isIt;

const webhookSchema = new Schema({
    name: {type: String},
    trigger: {type: Number},
    triggerName: {type:String},
    url: {type: String},
    clientId: {type: String},
    isDeleted: {type: Number, default: isIt.NO}
})

module.exports = mongoose.model("webhook", webhookSchema);






