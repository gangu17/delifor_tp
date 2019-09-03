const common = require('./error').CODES;
const team = require('./error').TEAM_CODES;


module.exports = {

  sendServerError: (cb) => {
    cb(null, formResponse(common.SERVER_ERROR, {message: "We are optimizing server, Please try after sometime"}));
  },

  sendSuccess: (cb, body) => {
    cb(null, formResponse(common.SUCCESS, body));
  },

  businessMissing: (cb) => {
    cb(null, formResponse(common.BUSINESS_TYPE_REQUIRED, {message: "Business type is required"}));
  },

  sendResult: (statusCode, body, cb) => {
    cb(null, statusCode, body);
  },

  sendUnAuth: (cb) => {
    cb(null, formResponse(common.AUTH, {message: 'Unauthorized'}));
  },

  fromTrigger: (cb) => {
    console.log('fromTrigger');
    cb(null, formResponse(400, ''));
  },

  invalidInput: (cb) => {
    cb(null, formResponse(common.BAD_REQUEST, {message: 'Parameters are missing'}));
  }
};

function formResponse(code, body) {
  const response = {headers: {'Content-Type': '*', 'Access-Control-Allow-Origin': '*'}};
  const result = (typeof body === 'object') ? JSON.stringify(body) : body;
  return Object.assign(response, {statusCode: code, body: result});
}
