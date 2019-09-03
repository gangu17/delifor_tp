const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const constant = require('./constant')();
const tables = constant.TABLES;
const isIt = constant.isIt;


const webhookSchema = new Schema({
    name: {type: String},
    url: {type: String},
    trigger: {type: Number},
    clientId: {type: String},
    isDeleted: {type: Number}
});

const webhookModel = mongoose.model("webhook", webhookSchema);
module.exports = {webhookModel: webhookModel};









