let cb;
const result = require('./result');

try {
  const getConstant = require('./constant')();
  // const callback = function (err, data) {
  //   console.log('callback called+++++++++++++++++++++++++++++++++');
  //   console.log(err, data);
  // };
  // const event = {
  //     "resource": "/task",
  //     "path": "/task",
  //     "httpMethod": "POST",
  //     "headers": {
  //         "Accept": "*/*",
  //         "Accept-Encoding": "gzip, deflate, br",
  //         "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8",
  //         "apikey": "grQEkgKTsgEF5cnvXv6vnBGf3Ozhn7gdlL4kbHtpKlkEhVXBCxBDizPEZZQw0gcFcFc",
  //         "cache-control": "no-cache",
  //         "CloudFront-Forwarded-Proto": "https",
  //         "CloudFront-Is-Desktop-Viewer": "true",
  //         "CloudFront-Is-Mobile-Viewer": "false",
  //         "CloudFront-Is-SmartTV-Viewer": "false",
  //         "CloudFront-Is-Tablet-Viewer": "false",
  //         "CloudFront-Viewer-Country": "IN",
  //         "content-type": "application/json",
  //         "Host": "b3avswn5h0.execute-api.ap-south-1.amazonaws.com",
  //         "origin": "chrome-extension://fhbjgbiflinjbdggehcddcbncdddomop",
  //         "postman-token": "08469f42-f223-fdeb-4539-d8cb542f775e",
  //         "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36",
  //         "Via": "2.0 f1d4e39bef236cf869562ee55cde3be5.cloudfront.net (CloudFront)",
  //         "X-Amz-Cf-Id": "afrhiwvcLbuNuI6XzDRVSR_9vK4uaPs1nkZvp9FwrmwNupNHSBhMRA==",
  //         "X-Amzn-Trace-Id": "Root=1-5c397d1e-65aaec9a7926104a0ca99bae",
  //         "X-Forwarded-For": "106.51.73.130, 70.132.7.96",
  //         "X-Forwarded-Port": "443",
  //         "X-Forwarded-Proto": "https"
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
  //             "grQEkgKTsgEF5cnvXv6vnBGf3Ozhn7gdlL4kbHtpKlkEhVXBCxBDizPEZZQw0gcFcFc"
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
  //         "content-type": [
  //             "application/json"
  //         ],
  //         "Host": [
  //             "b3avswn5h0.execute-api.ap-south-1.amazonaws.com"
  //         ],
  //         "origin": [
  //             "chrome-extension://fhbjgbiflinjbdggehcddcbncdddomop"
  //         ],
  //         "postman-token": [
  //             "08469f42-f223-fdeb-4539-d8cb542f775e"
  //         ],
  //         "User-Agent": [
  //             "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36"
  //         ],
  //         "Via": [
  //             "2.0 f1d4e39bef236cf869562ee55cde3be5.cloudfront.net (CloudFront)"
  //         ],
  //         "X-Amz-Cf-Id": [
  //             "afrhiwvcLbuNuI6XzDRVSR_9vK4uaPs1nkZvp9FwrmwNupNHSBhMRA=="
  //         ],
  //         "X-Amzn-Trace-Id": [
  //             "Root=1-5c397d1e-65aaec9a7926104a0ca99bae"
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
  //     "queryStringParameters": null,
  //     "multiValueQueryStringParameters": null,
  //     "pathParameters": null,
  //     "stageVariables": null,
  //     "requestContext": {
  //         "resourceId": "g7l1i6",
  //         "authorizer": {
  //             "principalId": "{\"sub\":\"973a79b2-7928-4634-b252-838c78c8e707\",\"role\":1}"
  //         },
  //         "resourcePath": "/task",
  //         "httpMethod": "POST",
  //         "extendedRequestId": "TYB8vGx9BcwFf4A=",
  //         "requestTime": "12/Jan/2019:05:37:34 +0000",
  //         "path": "/Development/task",
  //         "accountId": "786724127547",
  //         "protocol": "HTTP/1.1",
  //         "stage": "Development",
  //         "domainPrefix": "b3avswn5h0",
  //         "requestTimeEpoch": 1547271454397,
  //         "requestId": "299bf798-162c-11e9-8859-adf663044433",
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
  //             "userAgent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36",
  //             "user": null
  //         },
  //         "domainName": "b3avswn5h0.execute-api.ap-south-1.amazonaws.com",
  //         "apiId": "b3avswn5h0"
  //     },
  //     "body": "{\n  \"name\": \"Manager A\",\n  \"email\": \"email@gmail.com\",\n  \"date\": \"2019-01-11T08:02:32.830Z\",\n  \"lastName\": \"last\",\n  \"endDate\": \"2019-01-11T08:02:32.830Z\",\n  \"address\": \"Lourdu Nagar Rd, Lourdu Nagar, Swathantra Nagar, Krishnarajapura, Bengaluru, Karnataka 560049, India\",\n  \"phone\": \"+91 9066359086\",\n  \"isPickup\": true,\n  \"manual\": true,\n  \"businessType\": 1,\n  \"orderId\": \"6359086\",\n  \"timezone\": \"Asia/Calcutta\",\n  \"driver\": \"5247858\"\n}",
  //     "isBase64Encoded": false
  // }
  //event.body = require('../../../mock').admin.event.body;

  exports.handler = (event, context, callback) => {
    console.log(JSON.stringify(event));
    cb = callback;
      context.callbackWaitsForEmptyEventLoop = false;

      getConstant.then(() => {
      //imports
      const db = require('./db').connect();
      const task = require('./task');
      const helper = require('./util');
      const userPlansModel = require('./model').userPlansModel;
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
      const data = helper.getBodyData(event);
      if (!data) {
        result.invalidInput(cb);
      }
      else {
        const clientId = principals['sub'];
        userPlansModel.findOne({clientId: clientId}).then((plan) => {
          console.log('plans' + plan);
          const plans = plan.toObject();
          if ((plans.planType === 1 && plans.taskCount < plans.taskLimit) || (plans.planType === 2)) {

            console.log('succeess plan conditions');
            return db.then(() => task.saveTask(event, cb, principals, plans)).catch((err) => {
              console.log(err);
              result.sendServerError(cb)
            });
          } else {
            result.PackageLimt(cb)
          }
          //
        })
      }
    }).catch((err) => {
      console.log(err);
      result.sendServerError(cb)
    });

  }
} catch (err) {
  console.error('error +++', err);
  result.sendServerError(cb);
}
// zip -r task_add *
