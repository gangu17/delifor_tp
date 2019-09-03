module.exports = {

  sendServerError: (cb) => {
    cb(null, formResponse(500, {message: "We are optimizing server, Please try after sometime"}));
  },

  sendSuccess: (cb, body) => {
    cb(null, formResponse(200, body));
  },

  sendResult: (statusCode, body, cb) => {
    cb(null, statusCode, body);
  },

  sendUnAuth: (cb) => {
    cb(null, formResponse(401, {message: 'Unauthorized'}));
  },

  invalidEmail: (cb) => {

  },

  invalidInput: (cb) => {
    cb(null, formResponse(common.BAD_REQUEST, {message: 'Parameters are missing'}));
  },


  fromTrigger: (cb) => {
    console.log('fromTrigger');
    cb(null, formResponse(400, {message: 'Parameters are missing'}));
  }
};

function formResponse(code, body) {
  const response = {headers: {'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*'}};
  const result = (typeof body === 'object') ? JSON.stringify(body) : body;
  return Object.assign(response, {statusCode: code, body: result});
}
