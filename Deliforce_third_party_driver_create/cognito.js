const AWS = require('aws-sdk');
const constant = require('./constant')();
const constantAWS = constant.AWS;
AWS.config.update({region: constantAWS.region});
const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
/*
const AmazonCognitoIdentity = require('amazon-cognito-identity-js-node');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const CognitoUserAttribute = AmazonCognitoIdentity.CognitoUserAttribute;
*/

module.exports = {
  createUser: function (user) {
    return new Promise((resolve, reject) => {

// Define AWS Cognito User Pool
      const poolData = {
        "UserPoolId": constantAWS['userPoolId'],
        "ClientId": constantAWS['clientId']
      };
//const userPool = new CognitoUserPool(poolData);
//console.log('userPool:', userPool);

// Define User Attributes
      const params = getParamsCreateUser(user);
// Create User via AWS Cognito
      cognitoidentityserviceprovider.adminCreateUser(params, function (err, result) {
        if (err) {
          reject(err);
        } else {
          console.log('user created', result);
          getParamsChangePassword(user, function (err, params) {
            if (err) {
              reject(err);
            } else {
              cognitoidentityserviceprovider.respondToAuthChallenge(params, function (err, data) {
                if (err) {
                  reject(err);
                } else {
                  resolve(result);
                }
              });
            }
          });
        }
      });
    });
  }
};

function getParamsCreateUser(user) {
  const attributeList = [
    {
      "Name": "email",
      "Value": user.email
    },
    {
      "Name": "email_verified",
      "Value": 'false'
    },
    {
      "Name": "phone_number_verified",
      "Value": 'true'
    },
    {
      "Name": 'name',
      "Value": user.name
    },
    {
      "Name": 'phone_number',
      "Value": user.phone.replace(' ', '')
    }];


  var params = {
    "UserPoolId": constantAWS['userPoolId'],
    "Username": user.phone.replace(' ', ''),
    "UserAttributes": attributeList,
    MessageAction: "SUPPRESS",
    TemporaryPassword: user.password
  };
  return params;
}


function getParamsChangePassword(user, cb) {
  cognitoidentityserviceprovider.adminInitiateAuth({
    AuthFlow: 'ADMIN_NO_SRP_AUTH',
    ClientId: constantAWS['clientId'],
    UserPoolId: constantAWS['userPoolId'],
    AuthParameters: {USERNAME: user.phone.replace(' ', ''), PASSWORD: user.password}
  }, function (err, userData) {
    var params = {
      ChallengeName: 'NEW_PASSWORD_REQUIRED',
      ClientId: constantAWS['clientId'],
      ChallengeResponses: {
        USERNAME: user.phone.replace(' ', ''),
        NEW_PASSWORD: user.password
      },
      Session: userData.Session
    };
    cb(err, params);
  });
}
