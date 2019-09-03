var AWS = require('aws-sdk');
AWS.config.region = 'ap-south-1';
var lambda = new AWS.Lambda();


module.exports.call = function (payload, adminDetails, smsGateWayData) {
    console.log('payload', payload);
    console.log('admin', adminDetails);
    console.log('smsGateWayData', smsGateWayData);

    var params = {
        FunctionName: 'Deliforce_emailService', // the lambda function we are going to invoke
        InvocationType: 'Event',
        LogType: 'Tail',
        Payload: JSON.stringify(Object.assign({},
            payload,
            {smsPlan: adminDetails.smsPlan},
            {context: 'DRIVER_REGISTRATION'},
            {companyName: adminDetails.companyName},
            {smsGateWayData: smsGateWayData}))
    };

    return new Promise((resolve, reject) => {
        lambda.invoke(params, function (err, data) {
            console.log('data', data);
            if (err) {

                console.log(err);
                resolve();
            } else {
                console.log('Lambda said ' + data.Payload);
                resolve();
            }
        })
    })
};
