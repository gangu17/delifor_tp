let cb;
const result = require('./result');

try {
 // const event = {
 //     "resource": "/task/taskid",
 //     "path": "/task/taskid",
 //     "httpMethod": "GET",
 //     "headers": {
 //         "Accept": "*/*",
 //         "Accept-Encoding": "gzip, deflate",
 //         "apiKey": "ZKhcjbOT0jXxnQRA94y8qZtPcJ7K58yGUB3no4AOwY293JjHw3PnTqDui3B6RwcFcFc",
 //         "cache-control": "no-cache",
 //         "CloudFront-Forwarded-Proto": "https",
 //         "CloudFront-Is-Desktop-Viewer": "true",
 //         "CloudFront-Is-Mobile-Viewer": "false",
 //         "CloudFront-Is-SmartTV-Viewer": "false",
 //         "CloudFront-Is-Tablet-Viewer": "false",
 //         "CloudFront-Viewer-Country": "IN",
 //         "Content-Type": "application/json",
 //         "Host": "b3avswn5h0.execute-api.ap-south-1.amazonaws.com",
 //         "Postman-Token": "da19ea79-e1c2-4bb3-8846-fd6d8f1b8c4e",
 //         "User-Agent": "PostmanRuntime/7.6.0",
 //         "Via": "1.1 5c49044a9bbc82066ce04ae597e1a6a7.cloudfront.net (CloudFront)",
 //         "X-Amz-Cf-Id": "pDfm46IO9sgy1a9zrcIZwPeVyjI-41CimYyIpC6Dl7tzLrCiIAf5zg==",
 //         "X-Amzn-Trace-Id": "Root=1-5c39cb06-e2c7b5eca2110e60d8eb8316",
 //         "X-Forwarded-For": "106.51.73.130, 70.132.7.78",
 //         "X-Forwarded-Port": "443",
 //         "X-Forwarded-Proto": "https"
 //     },
 //     "multiValueHeaders": {
 //         "Accept": [
 //             "*/*"
 //         ],
 //         "Accept-Encoding": [
 //             "gzip, deflate"
 //         ],
 //         "apiKey": [
 //             "ZKhcjbOT0jXxnQRA94y8qZtPcJ7K58yGUB3no4AOwY293JjHw3PnTqDui3B6RwcFcFc"
 //         ],
 //         "cache-control": [
 //             "no-cache"
 //         ],
 //         "CloudFront-Forwarded-Proto": [
 //             "https"
 //         ],
 //         "CloudFront-Is-Desktop-Viewer": [
 //             "true"
 //         ],
 //         "CloudFront-Is-Mobile-Viewer": [
 //             "false"
 //         ],
 //         "CloudFront-Is-SmartTV-Viewer": [
 //             "false"
 //         ],
 //         "CloudFront-Is-Tablet-Viewer": [
 //             "false"
 //         ],
 //         "CloudFront-Viewer-Country": [
 //             "IN"
 //         ],
 //         "Content-Type": [
 //             "application/json"
 //         ],
 //         "Host": [
 //             "b3avswn5h0.execute-api.ap-south-1.amazonaws.com"
 //         ],
 //         "Postman-Token": [
 //             "da19ea79-e1c2-4bb3-8846-fd6d8f1b8c4e"
 //         ],
 //         "User-Agent": [
 //             "PostmanRuntime/7.6.0"
 //         ],
 //         "Via": [
 //             "1.1 5c49044a9bbc82066ce04ae597e1a6a7.cloudfront.net (CloudFront)"
 //         ],
 //         "X-Amz-Cf-Id": [
 //             "pDfm46IO9sgy1a9zrcIZwPeVyjI-41CimYyIpC6Dl7tzLrCiIAf5zg=="
 //         ],
 //         "X-Amzn-Trace-Id": [
 //             "Root=1-5c39cb06-e2c7b5eca2110e60d8eb8316"
 //         ],
 //         "X-Forwarded-For": [
 //             "106.51.73.130, 70.132.7.78"
 //         ],
 //         "X-Forwarded-Port": [
 //             "443"
 //         ],
 //         "X-Forwarded-Proto": [
 //             "https"
 //         ]
 //     },
 //     "queryStringParameters": {
 //         "taskId": "97527229"
 //     },
 //     "multiValueQueryStringParameters": {
 //         "taskId": [
 //             "97527229"
 //         ]
 //     },
 //     "pathParameters": null,
 //     "stageVariables": null,
 //     "requestContext": {
 //         "resourceId": "t3euee",
 //         "authorizer": {
 //             "principalId": "{\"sub\":\"4428d1c9-2737-4378-b7e2-d2a423075fb0\",\"role\":1}"
 //         },
 //         "resourcePath": "/task/taskid",
 //         "httpMethod": "GET",
 //         "extendedRequestId": "TYypFGf3BcwFs5w=",
 //         "requestTime": "12/Jan/2019:11:09:58 +0000",
 //         "path": "/Development/task/taskid",
 //         "accountId": "786724127547",
 //         "protocol": "HTTP/1.1",
 //         "stage": "Development",
 //         "domainPrefix": "b3avswn5h0",
 //         "requestTimeEpoch": 1547291398935,
 //         "requestId": "997af278-165a-11e9-a1f0-a324f59d2c5d",
 //         "identity": {
 //             "cognitoIdentityPoolId": null,
 //             "accountId": null,
 //             "cognitoIdentityId": null,
 //             "caller": null,
 //             "sourceIp": "106.51.73.130",
 //             "accessKey": null,
 //             "cognitoAuthenticationType": null,
 //             "cognitoAuthenticationProvider": null,
 //             "userArn": null,
 //             "userAgent": "PostmanRuntime/7.6.0",
 //             "user": null
 //         },
 //         "domainName": "b3avswn5h0.execute-api.ap-south-1.amazonaws.com",
 //         "apiId": "b3avswn5h0"
 //     },
 //     "body": null,
 //     "isBase64Encoded": false
 // }
  const getConstant = require('./constant')();
  // const callback = function (err, data) {
  //   console.log('callback called+++++++++++++++++++++++++++++++++');
  //   console.log(err, data);
  // };
  // const event = require('../../../mock').admin.event;
  // event.queryStringParameters = require('../../../mock').data.taskGet;

    exports.handler = (event, context, callback) => {
      console.log('event', JSON.stringify(event));
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

      //const clientId = event.requestContext.authorizer.principalId;
      //connect to db
      db.then(() => task.init(event, cb, principals)).catch(sendError);

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
