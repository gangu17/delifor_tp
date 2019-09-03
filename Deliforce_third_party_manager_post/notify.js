var AWS = require('aws-sdk');
AWS.config.region = 'ap-south-1';
var lambda = new AWS.Lambda();

module.exports.call = function (payload, adminDetails) {
  console.log('payload',payload);
  console.log('admin',adminDetails);
  var params = {
    FunctionName: 'Deliforce_emailService', // the lambda function we are going to invoke
    InvocationType: 'Event',
    LogType: 'Tail',
    Payload: JSON.stringify(Object.assign({}, payload, {context: 'MANAGER_REGISTRATION'}, {companyName: adminDetails.companyName})) // PAYMENT
    // ClientContext: AWS.util.base64.encode(JSON.stringify(ctx))
  };

  return new Promise((resolve,reject)=>{
    lambda.invoke(params, function (err, data) {
      console.log('data', data);
      if (err) {
        console.log(err);
        reject(err);
      } else {
        console.log('Lambda said ' + data.Payload);
        resolve();
      }
    })
  })
};
