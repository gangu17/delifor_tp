let cb;
const result = require('./result');

try {
 // const event ={
 //        "resource": "/task/orderid",
 //        "path": "/task/orderid",
 //        "httpMethod": "GET",
 //        "headers": {
 //            "Accept": "*/*",
 //            "Accept-Encoding": "gzip, deflate",
 //            "apiKey": "ZKhcjbOT0jXxnQRA94y8qZtPcJ7K58yGUB3no4AOwY293JjHw3PnTqDui3B6RwcFcFc",
 //            "cache-control": "no-cache",
 //            "CloudFront-Forwarded-Proto": "https",
 //            "CloudFront-Is-Desktop-Viewer": "true",
 //            "CloudFront-Is-Mobile-Viewer": "false",
 //            "CloudFront-Is-SmartTV-Viewer": "false",
 //            "CloudFront-Is-Tablet-Viewer": "false",
 //            "CloudFront-Viewer-Country": "IN",
 //            "Content-Type": "application/json",
 //            "Host": "b3avswn5h0.execute-api.ap-south-1.amazonaws.com",
 //            "Postman-Token": "dea00072-e931-4848-991c-a107a43f8053",
 //            "User-Agent": "PostmanRuntime/7.6.0",
 //            "Via": "1.1 d9bab5a54319127f122d9d30bbc30bef.cloudfront.net (CloudFront)",
 //            "X-Amz-Cf-Id": "vHD1DzpGFXGt5qqa4B9oh77fzJrLA9bCj4nS6-SPJOvXzg17w7GNkA==",
 //            "X-Amzn-Trace-Id": "Root=1-5c39c20a-669296fa61758d98cb9bb87c",
 //            "X-Forwarded-For": "106.51.73.130, 70.132.7.78",
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
 //                "ZKhcjbOT0jXxnQRA94y8qZtPcJ7K58yGUB3no4AOwY293JjHw3PnTqDui3B6RwcFcFc"
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
 //            "Content-Type": [
 //                "application/json"
 //            ],
 //            "Host": [
 //                "b3avswn5h0.execute-api.ap-south-1.amazonaws.com"
 //            ],
 //            "Postman-Token": [
 //                "dea00072-e931-4848-991c-a107a43f8053"
 //            ],
 //            "User-Agent": [
 //                "PostmanRuntime/7.6.0"
 //            ],
 //            "Via": [
 //                "1.1 d9bab5a54319127f122d9d30bbc30bef.cloudfront.net (CloudFront)"
 //            ],
 //            "X-Amz-Cf-Id": [
 //                "vHD1DzpGFXGt5qqa4B9oh77fzJrLA9bCj4nS6-SPJOvXzg17w7GNkA=="
 //            ],
 //            "X-Amzn-Trace-Id": [
 //                "Root=1-5c39c20a-669296fa61758d98cb9bb87c"
 //            ],
 //            "X-Forwarded-For": [
 //                "106.51.73.130, 70.132.7.78"
 //            ],
 //            "X-Forwarded-Port": [
 //                "443"
 //            ],
 //            "X-Forwarded-Proto": [
 //                "https"
 //            ]
 //        },
 //        "queryStringParameters": {
 //            "orderId": "54321"
 //        },
 //        "multiValueQueryStringParameters": {
 //            "orderId": [
 //                "54321"
 //            ]
 //        },
 //        "pathParameters": null,
 //        "stageVariables": null,
 //        "requestContext": {
 //            "resourceId": "1i3b2f",
 //            "authorizer": {
 //                "principalId": "{\"sub\":\"4428d1c9-2737-4378-b7e2-d2a423075fb0\",\"role\":1}"
 //            },
 //            "resourcePath": "/task/orderid",
 //            "httpMethod": "GET",
 //            "extendedRequestId": "TYtBsFsuBcwFQpA=",
 //            "requestTime": "12/Jan/2019:10:31:38 +0000",
 //            "path": "/Development/task/orderid",
 //            "accountId": "786724127547",
 //            "protocol": "HTTP/1.1",
 //            "stage": "Development",
 //            "domainPrefix": "b3avswn5h0",
 //            "requestTimeEpoch": 1547289098845,
 //            "requestId": "3e8511cf-1655-11e9-b8b1-1f1e2efd91a8",
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
 //                "userAgent": "PostmanRuntime/7.6.0",
 //                "user": null
 //            },
 //            "domainName": "b3avswn5h0.execute-api.ap-south-1.amazonaws.com",
 //            "apiId": "b3avswn5h0"
 //        },
 //        "body": null,
 //        "isBase64Encoded": false
 //    }

  const getConstant = require('./constant')();
  // const callback = function (err, data) {
  //   console.log('callback called+++++++++++++++++++++++++++++++++');
  //   console.log(err, data);
  // };
  // const event = require('../../../mock').admin.event;
  // event.queryStringParameters = require('../../../mock').data.taskGet;
  //event.queryStringParameters = {orderId:"2343546"};

  exports.handler = (event, context, callback) => {
    cb = callback;
    console.log('event', JSON.stringify(event));
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









































