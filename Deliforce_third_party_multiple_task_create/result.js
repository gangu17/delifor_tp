const common = require('./error').CODES;
const task = require('./error').TASK_CODES;

module.exports = {

  sendServerError: (res) => {
    res.status(500).send('error!');
  },

  sendSuccess: (res, body) => {
    res.json(body);
  },

  businessMissing: (res) => {
    cb(null, formResponse(common.BUSINESS_TYPE_REQUIRED,  {message: "Business type is required"}));
  },

  sendResult: (statusCode, body, cb) => {
    cb(null, statusCode, body);
  },

  sendUnAuth: (res) => {
    res.status(403).send('Unauthorized!');
  },

  invalidInput: (res) => {
    res.status(400).send('Unauthorized!');
  },


  addHeader: (res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  }


};



