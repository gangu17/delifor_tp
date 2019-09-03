const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const constant = require('./constant')();


const webHookSchema = new Schema({

});



module.exports = mongoose.model('webhooks', webHookSchema);






