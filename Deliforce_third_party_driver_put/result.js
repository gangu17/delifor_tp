const common = require('./error').CODES;
const driver = require('./error').DRIVER_CODES;


module.exports = {

    sendServerError: (cb) => {
        cb(null, formResponse(common.SERVER_ERROR, {message: "We are optimizing server, Please try after sometime"}));
    },

    driverBusy: (cb) => {
        cb(null, formResponse(common.DRIVER_BUSY, {}))
    },

    emailRequired: (cb, body) => {
        cb(null, formResponse(common.EMAIL_REQUIRED, body));
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
        cb(null, formResponse(common.EMAIL_INVALID, {message: 'Invalid Email'}));
    },

    invalidName: (cb) => {
        cb(null, formResponse(common.NAME_INVALID, {message: 'Invalid Name'}));
    },
    invalidPassword: (cb) => {
        cb(null, formResponse(common.PASSWORD_INVALID, {message: 'Invalid Password'}));
    },
    invalidPhone: (cb) => {
        cb(null, formResponse(common.PHONE_INVALID, {message: 'Invalid Phone'}));
    },


    TeamMandatory: (cb) => {
        cb(null, formResponse(driver.TEAM_MANDATORY, {message: 'Team is Mandatory'}));
    },

    Duplication: (cb) => {
        cb(null, formResponse(driver.DUPLICATE_DRIVER_NAME_AND_EMAIL, {message: 'Duplication of Driver and Email'}));
    },

    sendDuplicateEmail: (cb) => {
        cb(null, formResponse(driver.DUPLICTE_EMAIL, {message: 'Duplication of Driver Email'}));
    },

    sendDuplicatePhone: (cb) => {
        cb(null, formResponse(driver.DUPLICATE_PHONE, {message: 'Duplication of Driver phone number'}));
    },
    sendDuplicateEmailPhone: (cb) => {

        cb(null, formResponse(driver.DUPLICTE_EMAIL_PHONE, {message: 'Duplication of Driver Email and phone number'}));
    }


};

function formResponse(code, body) {
    const response = {headers: {'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*'}};
    const result = (typeof body === 'object') ? JSON.stringify(body) : body;
    return Object.assign(response, {statusCode: code, body: result});
}
