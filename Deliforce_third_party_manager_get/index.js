
let cb;
const result = require('./result');

try {
    // const event =   {
    //     "resource": "/manager",
    //     "path": "/manager",
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
    //         "Postman-Token": "c09a3cf3-9b60-4409-9191-998af0afc1ef",
    //         "User-Agent": "PostmanRuntime/7.6.0",
    //         "Via": "1.1 f171ab091c8a5c56a9c13ec1befacf99.cloudfront.net (CloudFront)",
    //         "X-Amz-Cf-Id": "DuSrqq6L2-XVhfxRxEqOcclKY8hXhmndjfX8VQSnnmSGhoobVOO5gw==",
    //         "X-Amzn-Trace-Id": "Root=1-5c39a17e-3b782c1062c19172b5533ffc",
    //         "X-Forwarded-For": "106.51.73.130, 70.132.7.96",
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
    //             "c09a3cf3-9b60-4409-9191-998af0afc1ef"
    //         ],
    //         "User-Agent": [
    //             "PostmanRuntime/7.6.0"
    //         ],
    //         "Via": [
    //             "1.1 f171ab091c8a5c56a9c13ec1befacf99.cloudfront.net (CloudFront)"
    //         ],
    //         "X-Amz-Cf-Id": [
    //             "DuSrqq6L2-XVhfxRxEqOcclKY8hXhmndjfX8VQSnnmSGhoobVOO5gw=="
    //         ],
    //         "X-Amzn-Trace-Id": [
    //             "Root=1-5c39a17e-3b782c1062c19172b5533ffc"
    //         ],
    //         "X-Forwarded-For": [
    //             "106.51.73.130, 70.132.7.96"
    //         ],
    //         "X-Forwarded-Port": [
    //             "443"
    //         ],
    //         "X-Forwarded-Proto": [
    //             "https"
    //         ]
    //     },
    //     "queryStringParameters": {
    //         "limit": "10",
    //         "managerIds": "36172986",
    //         "page": "1"
    //     },
    //     "multiValueQueryStringParameters": {
    //         "limit": [
    //             "10"
    //         ],
    //         "managerIds": [
    //             "80697886",
    //             "36172986"
    //         ],
    //         "page": [
    //             "1"
    //         ]
    //     },
    //     "pathParameters": null,
    //     "stageVariables": null,
    //     "requestContext": {
    //         "resourceId": "awrt0q",
    //         "authorizer": {
    //             "principalId": "{\"sub\":\"4428d1c9-2737-4378-b7e2-d2a423075fb0\",\"role\":1}"
    //         },
    //         "resourcePath": "/manager",
    //         "httpMethod": "GET",
    //         "extendedRequestId": "TYYrsHykBcwFS8g=",
    //         "requestTime": "12/Jan/2019:08:12:46 +0000",
    //         "path": "/Development/manager",
    //         "accountId": "786724127547",
    //         "protocol": "HTTP/1.1",
    //         "stage": "Development",
    //         "domainPrefix": "b3avswn5h0",
    //         "requestTimeEpoch": 1547280766005,
    //         "requestId": "d7c29692-1641-11e9-b123-4754917e6b88",
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
  //     console.log('callback called+++++++++++++++++++++++++++++++++');
  //     console.log(err,data);
  //   };
   // const event = require('../mock').admin.event;
   // event.multiValueQueryStringParameters = require('../mock').admin.event.multiValueQueryStringParameters;
     exports.handler = (event, context, callback) => {
     console.log('event', JSON.stringify(event));
     cb = callback;
     context.callbackWaitsForEmptyEventLoop = false;

    getConstant.then(() => {
      //imports
      const db = require('./db').connect();
      const manager = require('./manager');
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
     // const clientId = event.requestContext.authorizer.principalId;
      //connect to db
      db.then(() => manager.fetchManager(event, cb, principals)).catch(sendError);

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

// zip -r customer_fetch *
















