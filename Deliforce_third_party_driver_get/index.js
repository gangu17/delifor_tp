let cb;
const result = require('./result');

try {

  const getConstant = require('./constant')();
  const callback = function (err, data) {
    console.log('callback called+++++++++++++++++++++++++++++++++');
    console.log(err, data);
  };
  const event = {
      "resource": "/driver",
      "path": "/driver",
      "httpMethod": "PUT",
      "headers": {
          "Accept": "*/*",
          "Accept-Encoding": "gzip, deflate",
          "apiKey": "TlL2RzcpXMUSFSP09IPDJPQaFaFabdHdJwvBJEVtmFSWRP8aFaFaTqXNFOp4MA5zbFbFbwkY4wcFcFc",
          "cache-control": "no-cache",
          "CloudFront-Forwarded-Proto": "https",
          "CloudFront-Is-Desktop-Viewer": "true",
          "CloudFront-Is-Mobile-Viewer": "false",
          "CloudFront-Is-SmartTV-Viewer": "false",
          "CloudFront-Is-Tablet-Viewer": "false",
          "CloudFront-Viewer-Country": "IN",
          "Content-Type": "application/json",
          "Host": "api.deliforce.io",
          "Postman-Token": "aed6bd85-a593-4a3f-b985-f6a057aade87",
          "User-Agent": "PostmanRuntime/7.6.0",
          "Via": "1.1 da78ff54a0c1202d39e176494a195d90.cloudfront.net (CloudFront)",
          "X-Amz-Cf-Id": "iIz2xeiMZw3tmy552E1q9LH5THa6UM7czOz449aC79RsT37bx9IQhQ==",
          "X-Amzn-Trace-Id": "Root=1-5cee610e-a68c1c994c3f368df4cca3d0",
          "X-Forwarded-For": "122.179.162.78, 54.182.242.136",
          "X-Forwarded-Port": "443",
          "X-Forwarded-Proto": "https"
      },
      "multiValueHeaders": {
          "Accept": [
              "*/*"
          ],
          "Accept-Encoding": [
              "gzip, deflate"
          ],
          "apiKey": [
              "TlL2RzcpXMUSFSP09IPDJPQaFaFabdHdJwvBJEVtmFSWRP8aFaFaTqXNFOp4MA5zbFbFbwkY4wcFcFc"
          ],
          "cache-control": [
              "no-cache"
          ],
          "CloudFront-Forwarded-Proto": [
              "https"
          ],
          "CloudFront-Is-Desktop-Viewer": [
              "true"
          ],
          "CloudFront-Is-Mobile-Viewer": [
              "false"
          ],
          "CloudFront-Is-SmartTV-Viewer": [
              "false"
          ],
          "CloudFront-Is-Tablet-Viewer": [
              "false"
          ],
          "CloudFront-Viewer-Country": [
              "IN"
          ],
          "Content-Type": [
              "application/json"
          ],
          "Host": [
              "api.deliforce.io"
          ],
          "Postman-Token": [
              "aed6bd85-a593-4a3f-b985-f6a057aade87"
          ],
          "User-Agent": [
              "PostmanRuntime/7.6.0"
          ],
          "Via": [
              "1.1 da78ff54a0c1202d39e176494a195d90.cloudfront.net (CloudFront)"
          ],
          "X-Amz-Cf-Id": [
              "iIz2xeiMZw3tmy552E1q9LH5THa6UM7czOz449aC79RsT37bx9IQhQ=="
          ],
          "X-Amzn-Trace-Id": [
              "Root=1-5cee610e-a68c1c994c3f368df4cca3d0"
          ],
          "X-Forwarded-For": [
              "122.179.162.78, 54.182.242.136"
          ],
          "X-Forwarded-Port": [
              "443"
          ],
          "X-Forwarded-Proto": [
              "https"
          ]
      },
      "queryStringParameters": null,
      "multiValueQueryStringParameters": null,
      "pathParameters": null,
      "stageVariables": null,
      "requestContext": {
          "resourceId": "x1pxje",
          "authorizer": {
              "principalId": "{\"sub\":\"9b7b4f4a-a6df-4e4a-b69a-b5d41dd593c4\",\"role\":1}",
              "integrationLatency": 1177
          },
          "resourcePath": "/driver",
          "httpMethod": "PUT",
          "extendedRequestId": "acQaNEiBBcwFi0g=",
          "requestTime": "29/May/2019:10:38:06 +0000",
          "path": "/driver",
          "accountId": "204006638324",
          "protocol": "HTTP/1.1",
          "stage": "Prod",
          "domainPrefix": "api",
          "requestTimeEpoch": 1559126286164,
          "requestId": "d7f901db-81fd-11e9-ae51-f9e2b575d766",
          "identity": {
              "cognitoIdentityPoolId": null,
              "accountId": null,
              "cognitoIdentityId": null,
              "caller": null,
              "sourceIp": "122.179.162.78",
              "principalOrgId": null,
              "accessKey": null,
              "cognitoAuthenticationType": null,
              "cognitoAuthenticationProvider": null,
              "userArn": null,
              "userAgent": "PostmanRuntime/7.6.0",
              "user": null
          },
          "domainName": "api.deliforce.io",
          "apiId": "gd3ox9mdy3"
      },
      "body": "{\n  \"name\": \"Gautam A\",\n  \"email\": \"rinkesh.ravenous@gmail.com\",\n  \"password\": \"gautam@123\",\n  \"lastName\": \"\",\n  \"notes\": \"This is notes\",\n  \"transportDesc\": \"Car\",\n  \"kolor\": \"Red\",\n  \"licencePlate\": \"KA-09\",\n  \"phone\": \"+91 8980867605\",\n  \"driverId\": \"29119574\",\n  \"assignTeam\": \"6324\",\n  \"settings\": {\n    \"transportType\": 1,\n    \"ringtone\": 1,\n    \"vibration\": 1,\n    \"repeat\": false,\n    \"language\": 1,\n    \"navigation\": 1,\n    \"mapStyle\": 1,\n    \"showTraffic\": false,\n    \"powerSavingModel\": false,\n    \"navigationHelper\": false\n  }\n}",
      "isBase64Encoded": false
  }

    //event.queryStringParameters = data.driverFetch;
 // exports.handler = (event, context, callback) => {
    console.log('Event', JSON.stringify(event));
    cb = callback;
   //context.callbackWaitsForEmptyEventLoop = false;

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
      console.log(JSON.stringify(principals));


      //connect to db
      db.then(() => driver.getDrivers(event, cb, principals)).catch(sendError);

      function sendError(error) {
        console.error('error +++', error);
        result.sendServerError(cb);
      }
    }).catch((err) => {
      console.log(err);
      result.sendServerError(cb);
    });
// };
} catch (err) {
  console.error('error +++', err);
  result.sendServerError(cb);
}


