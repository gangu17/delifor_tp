
let cb;
const result = require('./result');

try {
  const getConstant = require('./constant')();
// const callback = function (err, data) {
//       console.log('callback called+++++++++++++++++++++++++++++++++');
//       console.log(err, data);
//     };
//    const event = {
//      "resource": "/task/assigntask",
//      "path": "/task/assigntask",
//      "httpMethod": "POST",
//      "headers": {
//        "Accept": "*/*",
//        "Accept-Encoding": "gzip, deflate, br",
//        "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8",
//        "apikey": "Yf0dM8wJqLpoiMaFaFa56qRLSrRN5rExxccNRaFaFa1KDVrWz6zwKp9szbFbFbWT9aFaFakij7qq3AcFcFc",
//        "cache-control": "no-cache",
//        "CloudFront-Forwarded-Proto": "https",
//        "CloudFront-Is-Desktop-Viewer": "true",
//        "CloudFront-Is-Mobile-Viewer": "false",
//        "CloudFront-Is-SmartTV-Viewer": "false",
//        "CloudFront-Is-Tablet-Viewer": "false",
//        "CloudFront-Viewer-Country": "IN",
//        "content-type": "application/json",
//        "Host": "93d6wjitt7.execute-api.ap-south-1.amazonaws.com",
//        "origin": "chrome-extension://fhbjgbiflinjbdggehcddcbncdddomop",
//        "postman-token": "53243107-4b43-159c-882c-06e7e3ddd213",
//        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36",
//        "Via": "2.0 940482e8695da5fdb5cf0f4bf9f97421.cloudfront.net (CloudFront)",
//        "X-Amz-Cf-Id": "RFhlEkt3SZcxJWqGAbkM2pCbxAW3aL5vQZoT486PSuidrm6S-Bxd8w==",
//        "X-Amzn-Trace-Id": "Root=1-5c245961-93bee5849e1d97843f273bd4",
//        "X-Forwarded-For": "106.51.73.130, 52.46.49.75",
//        "X-Forwarded-Port": "443",
//        "X-Forwarded-Proto": "https"
//      },
//      "multiValueHeaders": {
//        "Accept": [
//          "*/*"
//        ],
//        "Accept-Encoding": [
//          "gzip, deflate, br"
//        ],
//        "Accept-Language": [
//          "en-GB,en-US;q=0.9,en;q=0.8"
//        ],
//        "apikey": [
//          "Yf0dM8wJqLpoiMaFaFa56qRLSrRN5rExxccNRaFaFa1KDVrWz6zwKp9szbFbFbWT9aFaFakij7qq3AcFcFc"
//        ],
//        "cache-control": [
//          "no-cache"
//        ],
//        "CloudFront-Forwarded-Proto": [
//          "https"
//        ],
//        "CloudFront-Is-Desktop-Viewer": [
//          "true"
//        ],
//        "CloudFront-Is-Mobile-Viewer": [
//          "false"
//        ],
//        "CloudFront-Is-SmartTV-Viewer": [
//          "false"
//        ],
//        "CloudFront-Is-Tablet-Viewer": [
//          "false"
//        ],
//        "CloudFront-Viewer-Country": [
//          "IN"
//        ],
//        "content-type": [
//          "application/json"
//        ],
//        "Host": [
//          "93d6wjitt7.execute-api.ap-south-1.amazonaws.com"
//        ],
//        "origin": [
//          "chrome-extension://fhbjgbiflinjbdggehcddcbncdddomop"
//        ],
//        "postman-token": [
//          "53243107-4b43-159c-882c-06e7e3ddd213"
//        ],
//        "User-Agent": [
//          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36"
//        ],
//        "Via": [
//          "2.0 940482e8695da5fdb5cf0f4bf9f97421.cloudfront.net (CloudFront)"
//        ],
//        "X-Amz-Cf-Id": [
//          "RFhlEkt3SZcxJWqGAbkM2pCbxAW3aL5vQZoT486PSuidrm6S-Bxd8w=="
//        ],
//        "X-Amzn-Trace-Id": [
//          "Root=1-5c245961-93bee5849e1d97843f273bd4"
//        ],
//        "X-Forwarded-For": [
//          "106.51.73.130, 52.46.49.75"
//        ],
//        "X-Forwarded-Port": [
//          "443"
//        ],
//        "X-Forwarded-Proto": [
//          "https"
//        ]
//      },
//      "queryStringParameters": null,
//      "multiValueQueryStringParameters": null,
//      "pathParameters": null,
//      "stageVariables": null,
//      "requestContext": {
//        "resourceId": "3haqur",
//        "authorizer": {
//          "principalId": "{\"sub\":\"aed3f009-1d1b-4ca2-ac19-79dcdb3351f5\",\"role\":1}"
//        },
//        "resourcePath": "/task/assigntask",
//        "httpMethod": "POST",
//        "extendedRequestId": "SjLnMHbHBcwFUqQ=",
//        "requestTime": "27/Dec/2018:04:47:29 +0000",
//        "path": "/Development/task/assigntask",
//        "accountId": "204006638324",
//        "protocol": "HTTP/1.1",
//        "stage": "Development",
//        "domainPrefix": "93d6wjitt7",
//        "requestTimeEpoch": 1545886049256,
//        "requestId": "83cbd761-0992-11e9-866e-0df6303be813",
//        "identity": {
//          "cognitoIdentityPoolId": null,
//          "accountId": null,
//          "cognitoIdentityId": null,
//          "caller": null,
//          "sourceIp": "106.51.73.130",
//          "accessKey": null,
//          "cognitoAuthenticationType": null,
//          "cognitoAuthenticationProvider": null,
//          "userArn": null,
//          "userAgent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36",
//          "user": null
//        },
//        "domainName": "93d6wjitt7.execute-api.ap-south-1.amazonaws.com",
//        "apiId": "93d6wjitt7"
//      },
//      "body": "{\n\"driverId\":\"12571836\",\n\"taskId\":\"55571033\",\n\"taskStatus\":1\n}",
//      "isBase64Encoded": false
//    }

    exports.handler = (event,context,callback)=> {
   context.callbackWaitsForEmptyEventLoop = false;
    getConstant.then((constantData) => {
        console.log(JSON.stringify(constantData) + 'constant heree');
      //imports
        cb = callback;
      const db = require('./db').connect();
      const getStatus = require('./getStatusList');
      const helper = require('./util');




      const principals = helper.getPrincipals(cb, event);
      if (!principals) return;
      console.log(JSON.stringify(principals));


      //connect to db
      db.then(() => getStatus.statusList(event, cb, principals,constantData)).catch(sendError);

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







