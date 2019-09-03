const AWS = require('aws-sdk');
const constant = require('./constant')().AWS;
AWS.config.update({region: constant.region});
const options = {apiVersion: '2016-04-18', accessKeyId: constant.accessKeyId, secretAccessKey: constant.secretAccessKey}
const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider(options);


module.exports = {


  deleteUser: function (userName) {
    console.log(userName);
    return new Promise((resolve, reject) => {

      var params = {
        UserPoolId: constant['userPoolId'], /* required */
        Username: userName /* required */
      };
      cognitoidentityserviceprovider.adminDeleteUser(params, function (err, data) {
        console.log('congito err', err);
        if (err && err.code !== 'UserNotFoundException') reject(err); // an error occurred
        else resolve();           // successful response
      });

    });
  }
};
