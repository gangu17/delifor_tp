const common = require('./error').CODES;

module.exports = {

  sendEmptyPaginate: (cb) => {
    //TODO put it on const
    const tasks = {"docs": [], "total": 0, "limit": 10, "page": 1, "pages": 1};
    cb(null, formResponse(common.SUCCESS, tasks));
  },
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
    cb(null, formResponse(common.SUCCESS, {message: "Success"}));
  },

  invalidInput: (cb) => {
    cb(null, formResponse(common.BAD_REQUEST, {message: 'Parameters are missing'}));
  }

};

function formResponse(code, body) {
  const response = {headers: {'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*'}};
  const result = (typeof body === 'object') ? JSON.stringify(body) : body;
  return Object.assign(response, {statusCode: code, body: result});
}
