let cb;
const result = require('./result');

try {
  const getConstant = require('./constant')();
  // const callback = function (err, data) {
  //   console.log('callback called+++++++++++++++++++++++++++++++++');
  //   console.log(err, data);
  // };
  // const event = {
  //     "resource": "/zapier/task",
  //     "path": "/zapier/task",
  //     "httpMethod": "POST",
  //     "headers": {
  //         "Accept": "application/json",
  //         "Accept-Encoding": "gzip, deflate",
  //         "apiKey": "BFPsUzk7RDbFbFbynKDoNNYDV9QHU5k08oZasaFaFa2q5OXVybFbFbJ0WPduyUTylTLj4ZN00gcFcFc",
  //         "CloudFront-Forwarded-Proto": "https",
  //         "CloudFront-Is-Desktop-Viewer": "true",
  //         "CloudFront-Is-Mobile-Viewer": "false",
  //         "CloudFront-Is-SmartTV-Viewer": "false",
  //         "CloudFront-Is-Tablet-Viewer": "false",
  //         "CloudFront-Viewer-Country": "US",
  //         "Content-Type": "application/json; charset=utf-8",
  //         "Host": "api.deliforce.io",
  //         "User-Agent": "Zapier",
  //         "Via": "1.1 c30e2e24424040c28e96664ae03f9685.cloudfront.net (CloudFront)",
  //         "X-Amz-Cf-Id": "4H-EDn1n04zSkxXyc6s-Y4I4h0bgKeKi_FXmyoxz-Ar6KnsFfMcXJQ==",
  //         "X-Amzn-Trace-Id": "Root=1-5d07979e-9936112ea22aafc45c0a908a",
  //         "X-Forwarded-For": "52.0.79.228, 70.132.32.146",
  //         "X-Forwarded-Port": "443",
  //         "X-Forwarded-Proto": "https"
  //     },
  //     "multiValueHeaders": {
  //         "Accept": [
  //             "application/json"
  //         ],
  //         "Accept-Encoding": [
  //             "gzip, deflate"
  //         ],
  //         "apiKey": [
  //             "BFPsUzk7RDbFbFbynKDoNNYDV9QHU5k08oZasaFaFa2q5OXVybFbFbJ0WPduyUTylTLj4ZN00gcFcFc"
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
  //         "Content-Type": [
  //             "application/json; charset=utf-8"
  //         ],
  //         "Host": [
  //             "api.deliforce.io"
  //         ],
  //         "User-Agent": [
  //             "Zapier"
  //         ],
  //         "Via": [
  //             "1.1 c30e2e24424040c28e96664ae03f9685.cloudfront.net (CloudFront)"
  //         ],
  //         "X-Amz-Cf-Id": [
  //             "4H-EDn1n04zSkxXyc6s-Y4I4h0bgKeKi_FXmyoxz-Ar6KnsFfMcXJQ=="
  //         ],
  //         "X-Amzn-Trace-Id": [
  //             "Root=1-5d07979e-9936112ea22aafc45c0a908a"
  //         ],
  //         "X-Forwarded-For": [
  //             "52.0.79.228, 70.132.32.146"
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
  //         "resourceId": "8rp9di",
  //         "authorizer": {
  //             "principalId": "{\"sub\":\"4022989b-2e81-46a5-8d43-c595e2ec7564\",\"role\":1}",
  //             "integrationLatency": 0
  //         },
  //         "resourcePath": "/zapier/task",
  //         "httpMethod": "POST",
  //         "extendedRequestId": "bbSgvEx9BcwFViw=",
  //         "requestTime": "17/Jun/2019:13:37:34 +0000",
  //         "path": "/zapier/task",
  //         "accountId": "204006638324",
  //         "protocol": "HTTP/1.1",
  //         "stage": "Prod",
  //         "domainPrefix": "api",
  //         "requestTimeEpoch": 1560778654353,
  //         "requestId": "1029804f-9105-11e9-a3dd-a172243cfdc3",
  //         "identity": {
  //             "cognitoIdentityPoolId": null,
  //             "accountId": null,
  //             "cognitoIdentityId": null,
  //             "caller": null,
  //             "sourceIp": "52.0.79.228",
  //             "principalOrgId": null,
  //             "accessKey": null,
  //             "cognitoAuthenticationType": null,
  //             "cognitoAuthenticationProvider": null,
  //             "userArn": null,
  //             "userAgent": "Zapier",
  //             "user": null
  //         },
  //         "domainName": "api.deliforce.io",
  //         "apiId": "gd3ox9mdy3"
  //     },
  //     "body": "{\"orderId\": \"1345\", \"businessType\": 1, \"endDate\": \"2019-06-18T13:32:32+05:30\", \"description\": \"hello\", \"templateName\": \" new temp\", \"driverId\": \"56287852\", \"address\": \"Lourdu Nagar Rd, Lourdu Nagar, Swathantra Nagar, Krishnarajapura, Bengaluru, Karnataka 560049, India\", \"manual\": \"true\", \"templateData\": {\"\": \"{\\\"fieldName\\\":\\\"one\\\",\\\"fieldValue\\\":\\\"\\\",\\\"dataType\\\":\\\"text\\\",\\\"permitAgent\\\":\\\"Read and Write\\\",\\\"mandatoryFields\\\":\\\"Not-Mandatory\\\",\\\"order\\\":1}\"}, \"phone\": \"+91 9066359076\", \"teamId\": \"7858\", \"isPickup\": \"true\", \"lastName\": \"las\", \"date\": \"2019-06-18T13:32:32+05:30\", \"timezone\": \"Asia/Calcutta\", \"email\": \"email@gmail.com\", \"name\": \"Manager A\"}",
  //     "isBase64Encoded": false
  // }

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
