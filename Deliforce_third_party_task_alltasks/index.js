let cb;
const result = require('./result');

try {

   const getConstant = require('./constant')();


    // const event  = {
    //     "resource": "/task",
    //     "path": "/task",
    //     "httpMethod": "GET",
    //     "headers": {
    //         "Accept": "application/json",
    //         "Accept-Encoding": "gzip, deflate, br",
    //         "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8",
    //         "apikey": "z1TNQBC6xsnAZlj09kpLFardscfaFaFabShxS17FKGh1TH4trqQu2FiA4Ywnf7omBwcFcFc",
    //         "CloudFront-Forwarded-Proto": "https",
    //         "CloudFront-Is-Desktop-Viewer": "true",
    //         "CloudFront-Is-Mobile-Viewer": "false",
    //         "CloudFront-Is-SmartTV-Viewer": "false",
    //         "CloudFront-Is-Tablet-Viewer": "false",
    //         "CloudFront-Viewer-Country": "US",
    //         "Host": "api.deliforce.io",
    //         "Referer": "https://app.swaggerhub.com/apis-docs/deliforce/api/1.0.0",
    //         "User-Agent": "Amazon CloudFront",
    //         "Via": "2.0 382c0877688d3ba2e0300178da7e63cc.cloudfront.net (CloudFront), 1.1 32c5b7040885724e78019cc31f0ef3e9.cloudfront.net (CloudFront)",
    //         "X-Amz-Cf-Id": "HE3016YyBgjVQP4eVcd5CPF7U0cvWmqfdm3x5M1yqpAreNRTxUEQ5g==",
    //         "X-Amzn-Trace-Id": "Self=1-5c7926f9-9146f6f83d367818fecaa1b0;Root=1-5c7926f8-750865c6d659e46a5dabcb54",
    //         "X-Forwarded-For": "122.171.81.183, 52.66.194.189, 10.101.10.230, 52.70.1.52, 70.132.60.82",
    //         "X-Forwarded-Port": "443",
    //         "X-Forwarded-Proto": "https",
    //         "x-swaggerhub-cookie": ""
    //     },
    //     "multiValueHeaders": {
    //         "Accept": [
    //             "application/json"
    //         ],
    //         "Accept-Encoding": [
    //             "gzip, deflate, br"
    //         ],
    //         "Accept-Language": [
    //             "en-GB,en-US;q=0.9,en;q=0.8"
    //         ],
    //         "apikey": [
    //             "z1TNQBC6xsnAZlj09kpLFardscfaFaFabShxS17FKGh1TH4trqQu2FiA4Ywnf7omBwcFcFc"
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
    //             "US"
    //         ],
    //         "Host": [
    //             "api.deliforce.io"
    //         ],
    //         "Referer": [
    //             "https://app.swaggerhub.com/apis-docs/deliforce/api/1.0.0"
    //         ],
    //         "User-Agent": [
    //             "Amazon CloudFront"
    //         ],
    //         "Via": [
    //             "2.0 382c0877688d3ba2e0300178da7e63cc.cloudfront.net (CloudFront), 1.1 32c5b7040885724e78019cc31f0ef3e9.cloudfront.net (CloudFront)"
    //         ],
    //         "X-Amz-Cf-Id": [
    //             "HE3016YyBgjVQP4eVcd5CPF7U0cvWmqfdm3x5M1yqpAreNRTxUEQ5g=="
    //         ],
    //         "X-Amzn-Trace-Id": [
    //             "Self=1-5c7926f9-9146f6f83d367818fecaa1b0;Root=1-5c7926f8-750865c6d659e46a5dabcb54"
    //         ],
    //         "X-Forwarded-For": [
    //             "122.171.81.183, 52.66.194.189, 10.101.10.230, 52.70.1.52, 70.132.60.82"
    //         ],
    //         "X-Forwarded-Port": [
    //             "443"
    //         ],
    //         "X-Forwarded-Proto": [
    //             "https"
    //         ],
    //         "x-swaggerhub-cookie": [
    //             ""
    //         ]
    //     },
    //     "queryStringParameters": {
    //         "limit": "10",
    //         "page": "1",
    //         "timezone": "Asia/Calcutta"
    //     },
    //     "multiValueQueryStringParameters": {
    //         "limit": [
    //             "10"
    //         ],
    //         "page": [
    //             "1"
    //         ],
    //         "timezone": [
    //             "Asia/Calcutta"
    //         ]
    //     },
    //     "pathParameters": null,
    //     "stageVariables": null,
    //     "requestContext": {
    //         "resourceId": "8xucqk",
    //         "authorizer": {
    //             "principalId": "{\"sub\":\"755cc6b0-1360-467f-b35b-e2607308b402\",\"role\":1}"
    //         },
    //         "resourcePath": "/task",
    //         "httpMethod": "GET",
    //         "extendedRequestId": "V3MG-Hw0hcwFuTA=",
    //         "requestTime": "01/Mar/2019:12:35:05 +0000",
    //         "path": "/task",
    //         "accountId": "204006638324",
    //         "protocol": "HTTP/1.1",
    //         "stage": "Prod",
    //         "domainPrefix": "api",
    //         "requestTimeEpoch": 1551443705409,
    //         "requestId": "71010b60-3c1e-11e9-95eb-5571fa6d77ea",
    //         "identity": {
    //             "cognitoIdentityPoolId": null,
    //             "accountId": null,
    //             "cognitoIdentityId": null,
    //             "caller": null,
    //             "sourceIp": "52.70.1.52",
    //             "accessKey": null,
    //             "cognitoAuthenticationType": null,
    //             "cognitoAuthenticationProvider": null,
    //             "userArn": null,
    //             "userAgent": "Amazon CloudFront",
    //             "user": null
    //         },
    //         "domainName": "api.deliforce.io",
    //         "apiId": "gd3ox9mdy3"
    //     },
    //     "body": null,
    //     "isBase64Encoded": false
    // }
   // const event = require('../mock').admin.event;
   // event.queryStringParameters = require('../mock').admin.event.queryStringParameters;
   // const callback = function (err, data) {
   //    console.log('callback called+++++++++++++++++++++++++++++++++');
   //    console.log(err, data);
   // };

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

         //connect to db
         db.then(() => task.getTasks(event, cb, principals)).catch(sendError);

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









































