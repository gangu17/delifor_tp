const result = require('./result');
const driverModel = require('./model');
const helper = require('./util');

module.exports = {
    statusList:(event, cb, principals, constantData) => {
        const statusList = constantData.TASK_STATUS;
     result.sendSuccess(cb,statusList);
    }
};








