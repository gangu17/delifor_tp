const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  phone: {type: String, required: true},
  password: {type: String, required: true},
  role: {type: Number, required: true},
  //managers:[{type:Schema.Types.ObjectId,ref:'user'}],
  clientId: {type: String},
  teams: [{type: Schema.Types.ObjectId, ref: 'team'}],
  permissions: Schema.Types.Mixed,
  created_at: {type: Date, default: Date.now},
  color: {type: String}
}, {strite: false});

const teamSchema = new Schema({
  clientId: {type: String, required: true},
  teamName: {type: String, required: true},
  notes: {type: String},
  created_at: {type: Date, default: Date.now, required: true},
  isDeleted: {type: Number, default: 0},
  teamId: {type: String, required: true}
}, {strict: false});


userSchema.plugin(mongoosePaginate);
userSchema.index({name: "text", email: "text", phone: "text"});
const Manager = mongoose.model('user', userSchema);
const Teams = mongoose.model('team', teamSchema);
module.exports = {'Manager': Manager, 'Teams': Teams};




