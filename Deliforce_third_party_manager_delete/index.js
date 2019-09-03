
let cb;
const result = require('./result');

try {
// const event =
//     {
//         "resource": "/manager",
//         "path": "/manager",
//         "httpMethod": "DELETE",
//         "headers": {
//             "Accept": "*/*",
//             "Accept-Encoding": "gzip, deflate, br",
//             "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8",
//             "apikey": "FtM85qzbRsZRaFaFaHbKdEroYUbFbFbdJes2bFbFb4qrJOnR63ESXx27tlDm4hGeqSvYSrzP6wcFcFc",
//             "cache-control": "no-cache",
//             "CloudFront-Forwarded-Proto": "https",
//             "CloudFront-Is-Desktop-Viewer": "true",
//             "CloudFront-Is-Mobile-Viewer": "false",
//             "CloudFront-Is-SmartTV-Viewer": "false",
//             "CloudFront-Is-Tablet-Viewer": "false",
//             "CloudFront-Viewer-Country": "IN",
//             "Host": "b3avswn5h0.execute-api.ap-south-1.amazonaws.com",
//             "origin": "chrome-extension://fhbjgbiflinjbdggehcddcbncdddomop",
//             "postman-token": "2509506d-d1fe-6158-6843-e15b6024b93f",
//             "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36",
//             "Via": "2.0 5a0b4545b6ccc93ea532871131fe29d5.cloudfront.net (CloudFront)",
//             "X-Amz-Cf-Id": "b092kUz6ftnmnI3mMLuf2k97UuZCEKhWaGRcHXrsssYyMADvAfhxUQ==",
//             "X-Amzn-Trace-Id": "Root=1-5c399b45-e9a1ed34417c0ee482a9bbf2",
//             "X-Forwarded-For": "106.51.73.130, 70.132.7.78",
//             "X-Forwarded-Port": "443",
//             "X-Forwarded-Proto": "https"
//         },
//         "multiValueHeaders": {
//             "Accept": [
//                 "*/*"
//             ],
//             "Accept-Encoding": [
//                 "gzip, deflate, br"
//             ],
//             "Accept-Language": [
//                 "en-GB,en-US;q=0.9,en;q=0.8"
//             ],
//             "apikey": [
//                 "FtM85qzbRsZRaFaFaHbKdEroYUbFbFbdJes2bFbFb4qrJOnR63ESXx27tlDm4hGeqSvYSrzP6wcFcFc"
//             ],
//             "cache-control": [
//                 "no-cache"
//             ],
//             "CloudFront-Forwarded-Proto": [
//                 "https"
//             ],
//             "CloudFront-Is-Desktop-Viewer": [
//                 "true"
//             ],
//             "CloudFront-Is-Mobile-Viewer": [
//                 "false"
//             ],
//             "CloudFront-Is-SmartTV-Viewer": [
//                 "false"
//             ],
//             "CloudFront-Is-Tablet-Viewer": [
//                 "false"
//             ],
//             "CloudFront-Viewer-Country": [
//                 "IN"
//             ],
//             "Host": [
//                 "b3avswn5h0.execute-api.ap-south-1.amazonaws.com"
//             ],
//             "origin": [
//                 "chrome-extension://fhbjgbiflinjbdggehcddcbncdddomop"
//             ],
//             "postman-token": [
//                 "2509506d-d1fe-6158-6843-e15b6024b93f"
//             ],
//             "User-Agent": [
//                 "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36"
//             ],
//             "Via": [
//                 "2.0 5a0b4545b6ccc93ea532871131fe29d5.cloudfront.net (CloudFront)"
//             ],
//             "X-Amz-Cf-Id": [
//                 "b092kUz6ftnmnI3mMLuf2k97UuZCEKhWaGRcHXrsssYyMADvAfhxUQ=="
//             ],
//             "X-Amzn-Trace-Id": [
//                 "Root=1-5c399b45-e9a1ed34417c0ee482a9bbf2"
//             ],
//             "X-Forwarded-For": [
//                 "106.51.73.130, 70.132.7.78"
//             ],
//             "X-Forwarded-Port": [
//                 "443"
//             ],
//             "X-Forwarded-Proto": [
//                 "https"
//             ]
//         },
//         "queryStringParameters": {
//             "managerId": "40906607"
//         },
//         "multiValueQueryStringParameters": {
//             "managerId": [
//                 "40906607"
//             ]
//         },
//         "pathParameters": null,
//         "stageVariables": null,
//         "requestContext": {
//             "resourceId": "awrt0q",
//             "authorizer": {
//                 "principalId": "{\"sub\":\"973a79b2-7928-4634-b252-838c78c8e707\",\"role\":1}"
//             },
//             "resourcePath": "/manager",
//             "httpMethod": "DELETE",
//             "extendedRequestId": "TYUy5HSLhcwFo5A=",
//             "requestTime": "12/Jan/2019:07:46:13 +0000",
//             "path": "/Development/manager",
//             "accountId": "786724127547",
//             "protocol": "HTTP/1.1",
//             "stage": "Development",
//             "domainPrefix": "b3avswn5h0",
//             "requestTimeEpoch": 1547279173791,
//             "requestId": "22ba0307-163e-11e9-bfba-e563236d738f",
//             "identity": {
//                 "cognitoIdentityPoolId": null,
//                 "accountId": null,
//                 "cognitoIdentityId": null,
//                 "caller": null,
//                 "sourceIp": "106.51.73.130",
//                 "accessKey": null,
//                 "cognitoAuthenticationType": null,
//                 "cognitoAuthenticationProvider": null,
//                 "userArn": null,
//                 "userAgent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36",
//                 "user": null
//             },
//             "domainName": "b3avswn5h0.execute-api.ap-south-1.amazonaws.com",
//             "apiId": "b3avswn5h0"
//         },
//         "body": null,
//         "isBase64Encoded": false
//     }

  const getConstant = require('./constant')();
  // const callback = function (err, data) {
  //     console.log('callback called+++++++++++++++++++++++++++++++++');
  //     console.log(err,data);
  //   };
 // const event = require('../../mock').admin.event;*/
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

      //connect to db
      db.then(() => manager.deleteManager(event, cb, principals)).catch(sendError);

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





















