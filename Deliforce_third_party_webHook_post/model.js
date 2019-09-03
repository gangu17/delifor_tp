const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const constant = require('./constant')();
const tables = constant.TABLES;
const isIt = constant.isIt;

const webhookSchema = new Schema({
    webhookId: {type: String, required: true},
    name: {type: String, required: true},
    trigger: {type: Number, required: true},
    triggerName:{type:String, required: true},
    url: {type: String, required: true},
    clientId: {type: String, required: true},
    isDeleted: {type: Number, default: isIt.NO}
})

module.exports = mongoose.model("webhook", webhookSchema);






