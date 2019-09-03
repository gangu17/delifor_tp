const common = require('./error').CODES;
const task = require('./error').TASK_CODES;


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
        cb(null, formResponse(400, {message: 'Parameters are missing'}));
    },

    invalidInput: (cb) => {
        cb(null, formResponse(common.BAD_REQUEST, {message: 'Parameters are missing'}));
    },


    //app

    invalidEmail: (cb) => {
        cb(null, formResponse(common.EMAIL_INVALID, {message: 'Invalid email'}));
    },

    invalidAddress: (cb) => {
        cb(null, formResponse(task.ADDRESS_INVALID, {message: 'Invalid address'}));
    },

    invalidDate: (cb) => {
        cb(null, formResponse(task.DATE_REQUIRED, {message: 'Invalid date'}));
    },

    lesserThanCurrentDate: (cb) => {
        cb(null, formResponse(task.START_LESSER_THAN_CURRENT, {message: "Start date and time is lesser than current date and time"}));
    },

    //not applicable for pickup & delivery
    endLesserThanStart: (cb) => {
        cb(null, formResponse(task.END_DATE_LESSER_START, {message: 'End date and time is lesser than start date and time'}));
    },
};

function formResponse(code, body) {
    const response = {headers: {'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*'}};
    const result = (typeof body === 'object') ? JSON.stringify(body) : body;
    return Object.assign(response, {statusCode: code, body: result});
}
