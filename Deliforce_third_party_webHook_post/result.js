const common = require('./error').CODES;
const task = require('./error').TASK_CODES;
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

    sendUrlNotExixts: (cb) => {
        cb(null, formResponse(common.URL_NOT_EXISTS, {message: 'Url does not exist or might not be hosted in server'}));
    },

    fromTrigger: (cb) => {
        cb(null, formResponse(400, ''));
    },

    invalidInput: (cb) => {
        cb(null, formResponse(common.BAD_REQUEST, {message: 'Parameters are missing'}));
    },

    //app
    duplicateTrigger: (cb) => {
        cb(null, formResponse(team.DUPLICATE_TRIGGER, {message: 'Webhook trigger already exists'}));
    }
};

function formResponse(code, body) {
    const response = {headers: {'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*'}};
    const result = (typeof body === 'object') ? JSON.stringify(body) : body;
    return Object.assign(response, {statusCode: code, body: result});
}


