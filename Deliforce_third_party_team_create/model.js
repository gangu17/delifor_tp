const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const constant = require('./constant')();
const tables = constant.TABLES;
const isIt = constant.isIt;


const teamSchema = new Schema({
    teamName: {type: String, required: true}, //UNIQUE tested in backend
    notes: {type: String},
    teamId: {type: String, required: true},//Random  unique ID
    accuracy: {type: Number, default: isIt.YES}, //Accuray constant
    pinCode: {type: Number},
    // from logic
    created_at: {type: Date, default: Date.now, required: true},
    clientId: {type: String, required: true},
    isDeleted: {type: Number, default: isIt.NO},
});

module.exports = mongoose.model(tables.TEAM, teamSchema);






