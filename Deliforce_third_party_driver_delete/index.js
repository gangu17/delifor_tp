let cb;
const result = require('./result');

try {

  const getConstant = require('./constant')();
  // const callback = function (err, data) {
  //   console.log('callback called+++++++++++++++++++++++++++++++++');
  //   console.log(err, data);
  // };
    // const event = {
    //   "resource": "/driver",
    //   "path": "/driver",
    //   "httpMethod": "PUT",
    //   "headers": {
    //     "Accept": "*/*",
    //     "Accept-Encoding": "deflate, gzip",
    //     "apiKey": "UYKHn7L0dXZbE9nAYLe8rbFbFbpqPORAkJgPRtjqTcNarJaqjwgq2bFbFbaFaFabFHXPYK7GzAcFcFc",
    //     "cache-control": "no-cache",
    //     "CloudFront-Forwarded-Proto": "https",
    //     "CloudFront-Is-Desktop-Viewer": "true",
    //     "CloudFront-Is-Mobile-Viewer": "false",
    //     "CloudFront-Is-SmartTV-Viewer": "false",
    //     "CloudFront-Is-Tablet-Viewer": "false",
    //     "CloudFront-Viewer-Country": "IN",
    //     "Content-Type": "application/x-www-form-urlencoded",
    //     "Host": "93d6wjitt7.execute-api.ap-south-1.amazonaws.com",
    //     "Postman-Token": "5d44d5e2-e368-41c3-9f67-0cbcd523eb22",
    //     "Via": "1.1 0554d15bff220c6ba83cdf4d634a1c73.cloudfront.net (CloudFront)",
    //     "X-Amz-Cf-Id": "AuXd16al5TpRarLt6O396e32Fzg-TITv4IzDgHGz1jlc3L8J3Tr2hA==",
    //     "X-Amzn-Trace-Id": "Root=1-5c2ef799-5abdaea47957a86e2458bc40",
    //     "X-Forwarded-For": "106.51.73.130, 70.132.25.82",
    //     "X-Forwarded-Port": "443",
    //     "X-Forwarded-Proto": "https"
    //   },
    //   "multiValueHeaders": {
    //     "Accept": [
    //       "*/*"
    //     ],
    //     "Accept-Encoding": [
    //       "deflate, gzip"
    //     ],
    //     "apiKey": [
    //       "UYKHn7L0dXZbE9nAYLe8rbFbFbpqPORAkJgPRtjqTcNarJaqjwgq2bFbFbaFaFabFHXPYK7GzAcFcFc"
    //     ],
    //     "cache-control": [
    //       "no-cache"
    //     ],
    //     "CloudFront-Forwarded-Proto": [
    //       "https"
    //     ],
    //     "CloudFront-Is-Desktop-Viewer": [
    //       "true"
    //     ],
    //     "CloudFront-Is-Mobile-Viewer": [
    //       "false"
    //     ],
    //     "CloudFront-Is-SmartTV-Viewer": [
    //       "false"
    //     ],
    //     "CloudFront-Is-Tablet-Viewer": [
    //       "false"
    //     ],
    //     "CloudFront-Viewer-Country": [
    //       "IN"
    //     ],
    //     "Content-Type": [
    //       "application/x-www-form-urlencoded"
    //     ],
    //     "Host": [
    //       "93d6wjitt7.execute-api.ap-south-1.amazonaws.com"
    //     ],
    //     "Postman-Token": [
    //       "5d44d5e2-e368-41c3-9f67-0cbcd523eb22"
    //     ],
    //     "Via": [
    //       "1.1 0554d15bff220c6ba83cdf4d634a1c73.cloudfront.net (CloudFront)"
    //     ],
    //     "X-Amz-Cf-Id": [
    //       "AuXd16al5TpRarLt6O396e32Fzg-TITv4IzDgHGz1jlc3L8J3Tr2hA=="
    //     ],
    //     "X-Amzn-Trace-Id": [
    //       "Root=1-5c2ef799-5abdaea47957a86e2458bc40"
    //     ],
    //     "X-Forwarded-For": [
    //       "106.51.73.130, 70.132.25.82"
    //     ],
    //     "X-Forwarded-Port": [
    //       "443"
    //     ],
    //     "X-Forwarded-Proto": [
    //       "https"
    //     ]
    //   },
    //   "queryStringParameters": null,
    //   "multiValueQueryStringParameters": null,
    //   "pathParameters": null,
    //   "stageVariables": null,
    //   "requestContext": {
    //     "resourceId": "otgwau",
    //     "authorizer": {
    //       "principalId": "{\"sub\":\"7e5b7b4f-53fb-4a4f-ae89-ac33a9d3e550\",\"role\":1}"
    //     },
    //     "resourcePath": "/driver",
    //     "httpMethod": "PUT",
    //     "extendedRequestId": "S9ugCEzAhcwFe_A=",
    //     "requestTime": "04/Jan/2019:06:05:13 +0000",
    //     "path": "/Development/driver",
    //     "accountId": "204006638324",
    //     "protocol": "HTTP/1.1",
    //     "stage": "Development",
    //     "domainPrefix": "93d6wjitt7",
    //     "requestTimeEpoch": 1546581913828,
    //     "requestId": "b3670a78-0fe6-11e9-b48f-b942493574f2",
    //     "identity": {
    //       "cognitoIdentityPoolId": null,
    //       "accountId": null,
    //       "cognitoIdentityId": null,
    //       "caller": null,
    //       "sourceIp": "106.51.73.130",
    //       "accessKey": null,
    //       "cognitoAuthenticationType": null,
    //       "cognitoAuthenticationProvider": null,
    //       "userArn": null,
    //       "userAgent": null,
    //       "user": null
    //     },
    //     "domainName": "93d6wjitt7.execute-api.ap-south-1.amazonaws.com",
    //     "apiId": "93d6wjitt7"
    //   },
    //   "body": "{\"_id\":\"5c2ee20f1510bb17335cacb4\",\"settings\":{\"transportType\":\"3\"},\"email\":\"navaneethan.k@mailinator.com\",\"password\":\"@123Favass\",\"name\":\"Sasikala\",\"lastName\":\"R\",\"phone\":\"+91 88077508833\",\"assignTeam\":\"5c1e1e166d95477b65cbaabf\",\"notes\":\"sadfsafd\",\"transportDesc\":\"testing\",\"kolor\":\"testing\",\"licencePlate\":\"testing\"}",
    //   "isBase64Encoded": false
    // }


  // // event.queryStringParameters.data = require('../../mock').data.driverDelete;
  //  event.queryStringParameters = {data:'{"_id":"5afd63b84469d1bf7cdb1bf1"}'};

 exports.handler = (event, context, callback) => {
    cb = callback;
    context.callbackWaitsForEmptyEventLoop = false;
  console.log(JSON.stringify(event));

    getConstant.then(() => {
      //imports
      const db = require('./db').connect();
      const driver = require('./driver');
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
      db.then(() => driver.deleteDriver(event, cb, principals)).catch(sendError);

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


// driver_edit.zip
