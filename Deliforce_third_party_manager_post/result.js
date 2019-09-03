const common = require('./error').CODES;
const manager = require('./error').MANAGER_CODES;

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

    //manager

    sendEmailInvalid: (cb) => {
        cb(null, formResponse(common.EMAIL_INVALID, {message: 'Invalid email'}));
    },

    sendPhoneInvalid: (cb) => {
        cb(null, formResponse(common.PHONE_INVALID, {message: 'Invalid phone number'}));
    },

    sendNameInvalid: (cb) => {
        cb(null, formResponse(common.NAME_INVALID, {message: 'Invalid name'}));
    },

    sendInvalidPhoneOrEmail: (cb) => {
        cb(null, formResponse(manager.INVALID_PHONE_OR_EMAIL), {message: 'Invalid phone number and email'});
    },

    sendPasswordInvalid: (cb) => {
        cb(null, formResponse(common.PASSWORD_INVALID, {message: 'Invalid password'}));
    },

    sendTeamMandatory: (cb) => {
        cb(null, formResponse(manager.TEAM_MANDATORY, {message: 'Team is mandatory'}));
    },

    sendDuplicateEmail: (cb) => {
        cb(null, formResponse(manager.DUPLICTE_EMAIL, {message: 'Duplicate email'}));
    },

    sendDuplicatePhone: (cb) => {
        cb(null, formResponse(manager.DUPLICATE_PHONE, {message: 'Duplicate email'}));
    },
    sendDuplicateEmailPhone: (cb) => {
        cb(null, formResponse(manager.DUPLICTE_EMAIL_PHONE, {message: 'Duplicate email and phone number'}));
    }

};

function formResponse(code, body) {
    const response = {headers: {'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*'}};
    const result = (typeof body === 'object') ? JSON.stringify(body) : body;
    return Object.assign(response, {statusCode: code, body: result});
}
