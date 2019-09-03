let cb;
const result = require('./result');
// const callback = function (err, data) {
//   console.log('callback called+++++++++++++++++++++++++++++++++');
//   console.log(err, data);
// };

try {

  const getConstant = require('./constant')();

  /*const event = require('../../mock').admin.event;
  //  event.body = require('../../mock').data.driverCreate;*/
  // const event ={
  //     "resource": "/driver",
  //     "path": "/driver",
  //     "httpMethod": "POST",
  //     "headers": {
  //         "Accept": "*/*",
  //         "Accept-Encoding": "gzip, deflate, br",
  //         "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8",
  //         "apikey": "bFbFbbFbFbYGNFTSwlegKwDaFaFa2ToNtNzVCQMfLxHCt5aFaFamcH9iqoWUxZ1aFaFaESezx6mVgaZS7AcFcFc",
  //         "CloudFront-Forwarded-Proto": "https",
  //         "CloudFront-Is-Desktop-Viewer": "true",
  //         "CloudFront-Is-Mobile-Viewer": "false",
  //         "CloudFront-Is-SmartTV-Viewer": "false",
  //         "CloudFront-Is-Tablet-Viewer": "false",
  //         "CloudFront-Viewer-Country": "US",
  //         "content-type": "application/json",
  //         "Host": "b3avswn5h0.execute-api.ap-south-1.amazonaws.com",
  //         "Referer": "https://app.swaggerhub.com/apis-docs/deliforce/api/1.0.0",
  //         "User-Agent": "Amazon CloudFront",
  //         "Via": "2.0 017d342814c21e57a8ef05ae15be24f5.cloudfront.net (CloudFront), 1.1 9d0536684daddf203ff3b546b85c5dfe.cloudfront.net (CloudFront)",
  //         "X-Amz-Cf-Id": "br_szwgjq7EBIKmfe13KKLwBwiEtu383r8NGCDKw67L6uZPyokIp9Q==",
  //         "X-Amzn-Trace-Id": "Self=1-5c4050a0-db8e0657deeec56a4e766a6e;Root=1-5c40509f-811f48fa1ca8c843a2ab4e94",
  //         "X-Forwarded-For": "106.51.73.130, 52.46.49.75, 10.101.20.173, 18.206.101.123, 54.240.144.42",
  //         "X-Forwarded-Port": "443",
  //         "X-Forwarded-Proto": "https",
  //         "x-swaggerhub-cookie": ""
  //     },
  //     "multiValueHeaders": {
  //         "Accept": [
  //             "*/*"
  //         ],
  //         "Accept-Encoding": [
  //             "gzip, deflate, br"
  //         ],
  //         "Accept-Language": [
  //             "en-GB,en-US;q=0.9,en;q=0.8"
  //         ],
  //         "apikey": [
  //             "bFbFbbFbFbYGNFTSwlegKwDaFaFa2ToNtNzVCQMfLxHCt5aFaFamcH9iqoWUxZ1aFaFaESezx6mVgaZS7AcFcFc"
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
  //         "content-type": [
  //             "application/json"
  //         ],
  //         "Host": [
  //             "b3avswn5h0.execute-api.ap-south-1.amazonaws.com"
  //         ],
  //         "Referer": [
  //             "https://app.swaggerhub.com/apis-docs/deliforce/api/1.0.0"
  //         ],
  //         "User-Agent": [
  //             "Amazon CloudFront"
  //         ],
  //         "Via": [
  //             "2.0 017d342814c21e57a8ef05ae15be24f5.cloudfront.net (CloudFront), 1.1 9d0536684daddf203ff3b546b85c5dfe.cloudfront.net (CloudFront)"
  //         ],
  //         "X-Amz-Cf-Id": [
  //             "br_szwgjq7EBIKmfe13KKLwBwiEtu383r8NGCDKw67L6uZPyokIp9Q=="
  //         ],
  //         "X-Amzn-Trace-Id": [
  //             "Self=1-5c4050a0-db8e0657deeec56a4e766a6e;Root=1-5c40509f-811f48fa1ca8c843a2ab4e94"
  //         ],
  //         "X-Forwarded-For": [
  //             "106.51.73.130, 52.46.49.75, 10.101.20.173, 18.206.101.123, 54.240.144.42"
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
  //     "queryStringParameters": null,
  //     "multiValueQueryStringParameters": null,
  //     "pathParameters": null,
  //     "stageVariables": null,
  //     "requestContext": {
  //         "resourceId": "q41ihn",
  //         "authorizer": {
  //             "principalId": "{\"sub\":\"e08cac38-e213-4474-87c6-00764539d649\",\"role\":1}"
  //         },
  //         "resourcePath": "/driver",
  //         "httpMethod": "POST",
  //         "extendedRequestId": "TpGJEHCQBcwFUdA=",
  //         "requestTime": "17/Jan/2019:09:53:36 +0000",
  //         "path": "/Development/driver",
  //         "accountId": "786724127547",
  //         "protocol": "HTTP/1.1",
  //         "stage": "Development",
  //         "domainPrefix": "b3avswn5h0",
  //         "requestTimeEpoch": 1547718816498,
  //         "requestId": "c2334d93-1a3d-11e9-a98b-db45e0415c1c",
  //         "identity": {
  //             "cognitoIdentityPoolId": null,
  //             "accountId": null,
  //             "cognitoIdentityId": null,
  //             "caller": null,
  //             "sourceIp": "18.206.101.123",
  //             "accessKey": null,
  //             "cognitoAuthenticationType": null,
  //             "cognitoAuthenticationProvider": null,
  //             "userArn": null,
  //             "userAgent": "Amazon CloudFront",
  //             "user": null
  //         },
  //         "domainName": "b3avswn5h0.execute-api.ap-south-1.amazonaws.com",
  //         "apiId": "b3avswn5h0"
  //     },
  //     "body": "{\"name\":\"Driver A\",\"email\":\"emdxxsqqail@gmail.com\",\"password\":\"Drivexxr@123\",\"lastName\":\"last Name\",\"notes\":\"This is notes\",\"transportDesc\":\"Car\",\"kolor\":\"Red\",\"licencePlate\":\"KA-09\",\"phone\":\"+91 96888859086\",\"assignTeam\":\"6064\",\"settings\":{\"transportType\":1}}",
  //     "isBase64Encoded": false
  // }
  exports.handler = (event, context, callback) => {

    cb = callback;
    context.callbackWaitsForEmptyEventLoop = false;


    getConstant.then(() => {
      //imports
      const db = require('./db').connect();
      const driver = require('./driver');

      const userPlansModel = require('./model').USERPLANS;
      const helper = require('./util');
      if (helper.checkFromTrigger(cb, event)) return;

      /*
      principals explanation: for admin sub is clientId for manager clientId is clientId
      {  sub: 'current user cognitosub',
      role: 'role id of user',
      clientId:'exist if user is manager & this is clientid of that manager',
      teams: 'team Assigned to manager' }
      */
      console.log(JSON.stringify(event));

      const principals = helper.getPrincipals(cb, event);
      if (!principals) return;

      //connect to db
      const data = helper.getBodyData(event);

      if (!data) {
        result.invalidInput(cb);
      }
      else {
        const clientId = (helper.isAdmin(principals)) ? principals['sub'] : principals['clientId'];

        userPlansModel.findOne({clientId: clientId}).then((plan) => {
          console.log('plans' + plan);

          const plans = plan.toObject();
          if ((plans.packageType === 1 && plans.agentCount < plans.agentLimit) || (plans.packageType === 2)) {

            console.log('succeess plan conditions');
            return db.then(() => driver.checkDuplicate(event, cb, principals, plans)).catch(sendError);
          } else {
            result.PACKAGELIMIT_EXCEED(cb);
          }
          //
        }).catch(sendError)

      }

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




