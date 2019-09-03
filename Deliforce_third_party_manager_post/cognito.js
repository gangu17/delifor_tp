/*
const AWS = require('aws-sdk');
const constant = require('./constant')().AWS;
AWS.config.update({region: constant.region});
const AmazonCognitoIdentity = require('amazon-cognito-identity-js-node');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const CognitoUserAttribute = AmazonCognitoIdentity.CognitoUserAttribute;

module.exports = {
  createUser: function (user) {
    return new Promise((resolve, reject) => {

      // Define AWS Cognito User Pool
      const poolData = {
        "UserPoolId": constant['userPoolId'],
        "ClientId": constant['clientId']
      };
      const userPool = new CognitoUserPool(poolData);
      //console.log('userPool:', userPool);

      // Define User Attributes
      const attributeList = [];
      const dataEmail = {
        "Name": "email",
        "Value": user.email
      };
      const dataName = {
        "Name": 'name',
        "Value": user.name
      };
      const dataPhone = {
        "Name": 'phone_number',
        "Value": user.phone.replace(' ', '')
      };

      const dataRole = {
        "Name": 'custom:role',
        "Value": '1'  //  because of he is admin
      };

      attributeList.push(new CognitoUserAttribute(dataEmail.Name, dataEmail.Value));
      attributeList.push(new CognitoUserAttribute(dataPhone.Name, dataPhone.Value));
      attributeList.push(new CognitoUserAttribute(dataName.Name, dataName.Value));
      attributeList.push(new CognitoUserAttribute(dataRole.Name, dataRole.Value));


      // Create User via AWS Cognito
      userPool.signUp(user.email, user.password, attributeList, null, function (err, result) {
        if (err) {
          reject(err);
        } else {
          console.log('user created' + JSON.stringify(result));
          resolve(result);
        }
      });
    });
  }
};
*/


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
      "Value": 'True'
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
    "Username": user.email,
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
    AuthParameters: {USERNAME: user.email, PASSWORD: user.password}
  }, function (err, userData) {
    var params = {
      ChallengeName: 'NEW_PASSWORD_REQUIRED',
      ClientId: constantAWS['clientId'],
      ChallengeResponses: {
        USERNAME: user.email,
        NEW_PASSWORD: user.password
      },
      Session: userData.Session
    };
    cb(err, params);
  });
}
