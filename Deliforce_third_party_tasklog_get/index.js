let cb;
const result = require('./result');

try {
  const getConstant = require('./constant')();
  // const callback = function (err, data) {
  //   console.log('callback called+++++++++++++++++++++++++++++++++');
  //   console.log(err, data);
  // };
  // const event = require('../../mock').admin.event;
  // event.queryStringParameters = require('../../mock').data.tasklog;
  exports.handler = (event, context, callback) => {
 //    const event = {
 //        "resource": "/tasklog",
 //        "path": "/tasklog",
 //        "httpMethod": "GET",
 //        "headers": {
 //            "Accept": "*/*",
 //            "Accept-Encoding": "gzip, deflate",
 //            "apiKey": "z1TNQBC6xsnAZlj09kpLFardscfaFaFabShxS17FKGh1TH4trqQu2FiA4Ywnf7omBwcFcFc",
 //            "cache-control": "no-cache",
 //            "CloudFront-Forwarded-Proto": "https",
 //            "CloudFront-Is-Desktop-Viewer": "true",
 //            "CloudFront-Is-Mobile-Viewer": "false",
 //            "CloudFront-Is-SmartTV-Viewer": "false",
 //            "CloudFront-Is-Tablet-Viewer": "false",
 //            "CloudFront-Viewer-Country": "IN",
 //            "Host": "api.deliforce.io",
 //            "Postman-Token": "f05e0692-7835-4c21-a47f-642ff4662df1",
 //            "User-Agent": "PostmanRuntime/7.1.1",
 //            "Via": "1.1 f7c2c81dcd8f9c4723ba9992c4abd851.cloudfront.net (CloudFront)",
 //            "X-Amz-Cf-Id": "5agc_I3V6qWYNPYXvSbY6QZOs6RioYRsWtTtsmfQgQAqLffRZI4dvA==",
 //            "X-Amzn-Trace-Id": "Root=1-5c7cb8fe-f54e64d079ca9308cac56900",
 //            "X-Forwarded-For": "106.51.73.130, 216.137.62.77",
 //            "X-Forwarded-Port": "443",
 //            "X-Forwarded-Proto": "https"
 //        },
 //        "multiValueHeaders": {
 //            "Accept": [
 //                "*/*"
 //            ],
 //            "Accept-Encoding": [
 //                "gzip, deflate"
 //            ],
 //            "apiKey": [
 //                "z1TNQBC6xsnAZlj09kpLFardscfaFaFabShxS17FKGh1TH4trqQu2FiA4Ywnf7omBwcFcFc"
 //            ],
 //            "cache-control": [
 //                "no-cache"
 //            ],
 //            "CloudFront-Forwarded-Proto": [
 //                "https"
 //            ],
 //            "CloudFront-Is-Desktop-Viewer": [
 //                "true"
 //            ],
 //            "CloudFront-Is-Mobile-Viewer": [
 //                "false"
 //            ],
 //            "CloudFront-Is-SmartTV-Viewer": [
 //                "false"
 //            ],
 //            "CloudFront-Is-Tablet-Viewer": [
 //                "false"
 //            ],
 //            "CloudFront-Viewer-Country": [
 //                "IN"
 //            ],
 //            "Host": [
 //                "api.deliforce.io"
 //            ],
 //            "Postman-Token": [
 //                "f05e0692-7835-4c21-a47f-642ff4662df1"
 //            ],
 //            "User-Agent": [
 //                "PostmanRuntime/7.1.1"
 //            ],
 //            "Via": [
 //                "1.1 f7c2c81dcd8f9c4723ba9992c4abd851.cloudfront.net (CloudFront)"
 //            ],
 //            "X-Amz-Cf-Id": [
 //                "5agc_I3V6qWYNPYXvSbY6QZOs6RioYRsWtTtsmfQgQAqLffRZI4dvA=="
 //            ],
 //            "X-Amzn-Trace-Id": [
 //                "Root=1-5c7cb8fe-f54e64d079ca9308cac56900"
 //            ],
 //            "X-Forwarded-For": [
 //                "106.51.73.130, 216.137.62.77"
 //            ],
 //            "X-Forwarded-Port": [
 //                "443"
 //            ],
 //            "X-Forwarded-Proto": [
 //                "https"
 //            ]
 //        },
 //        "queryStringParameters": {
 //            "taskId": "22226550"
 //        },
 //        "multiValueQueryStringParameters": {
 //            "taskId": [
 //                "22226550"
 //            ]
 //        },
 //        "pathParameters": null,
 //        "stageVariables": null,
 //        "requestContext": {
 //            "resourceId": "ap6idn",
 //            "authorizer": {
 //                "principalId": "{\"sub\":\"755cc6b0-1360-467f-b35b-e2607308b402\",\"role\":1}",
 //                "integrationLatency": 0
 //            },
 //            "resourcePath": "/tasklog",
 //            "httpMethod": "GET",
 //            "extendedRequestId": "WAHXtEyYhcwFYAw=",
 //            "requestTime": "04/Mar/2019:05:34:54 +0000",
 //            "path": "/tasklog",
 //            "accountId": "204006638324",
 //            "protocol": "HTTP/1.1",
 //            "stage": "Prod",
 //            "domainPrefix": "api",
 //            "requestTimeEpoch": 1551677694164,
 //            "requestId": "3d2b99aa-3e3f-11e9-bb59-0bc951c90cb9",
 //            "identity": {
 //                "cognitoIdentityPoolId": null,
 //                "accountId": null,
 //                "cognitoIdentityId": null,
 //                "caller": null,
 //                "sourceIp": "106.51.73.130",
 //                "accessKey": null,
 //                "cognitoAuthenticationType": null,
 //                "cognitoAuthenticationProvider": null,
 //                "userArn": null,
 //                "userAgent": "PostmanRuntime/7.1.1",
 //                "user": null
 //            },
 //            "domainName": "api.deliforce.io",
 //            "apiId": "gd3ox9mdy3"
 //        },
 //        "body": null,
 //        "isBase64Encoded": false
 //    }

    cb = callback;
    context.callbackWaitsForEmptyEventLoop = false;

    getConstant.then(() => {
      //imports
      const db = require('./db').connect();
      const task = require('./task');
      const helper = require('./util');

      if (helper.checkFromTrigger(cb, event)) return;

      /*
      principals explanation: for admin sub is clientId for manager clientId is clientId
      {  sub: 'current user cognitosub',
      role: 'role id of user',
      clientId:'exist if user is manager & this is clientid of that manager',
      teams: 'team Assigned to manager' }
      */

      const principals = helper.getPrincipals(cb, event);
      if (!principals) return;
      console.log(JSON.stringify(principals));


      //connect to db
      db.then(() => task.fetchTaskLog(event, cb, principals)).catch(sendError);

      function sendError(error) {
        console.error('error +++', error);
        result.sendServerError(cb);
      }
    }).catch((err) => {
      console.log(err);
      result.sendServerError(cb);
    });
  };
} catch (err) {
  console.error('error +++', err);
  result.sendServerError(cb);
}




// dashboard_fetchTaskLogs.zip
