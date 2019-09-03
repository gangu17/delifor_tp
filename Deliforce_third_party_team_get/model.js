const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
const constant = require('./constant')();
const tables = constant.TABLES;

const teamSchema=new Schema({

});


teamSchema.plugin(mongoosePaginate);
teamSchema.index({clientId:1,teamName:1,isDeleted:1});
module.exports=mongoose.model(tables.TEAM,teamSchema);






