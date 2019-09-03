let cb;
const result = require('./result');

try {
 // const event =  {
 //     "resource": "/task",
 //     "path": "/task",
 //     "httpMethod": "DELETE",
 //     "headers": {
 //         "Accept": "*/*",
 //         "Accept-Encoding": "gzip, deflate, br",
 //         "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8",
 //         "apikey": "bFbFbbFbFbYGNFTSwlegKwDaFaFa2ToNtNzVCQMfLxHCt5aFaFamcH9iqoWUxZ1aFaFaESezx6mVgaZS7AcFcFc",
 //         "cache-control": "no-cache",
 //         "CloudFront-Forwarded-Proto": "https",
 //         "CloudFront-Is-Desktop-Viewer": "true",
 //         "CloudFront-Is-Mobile-Viewer": "false",
 //         "CloudFront-Is-SmartTV-Viewer": "false",
 //         "CloudFront-Is-Tablet-Viewer": "false",
 //         "CloudFront-Viewer-Country": "IN",
 //         "Host": "b3avswn5h0.execute-api.ap-south-1.amazonaws.com",
 //         "origin": "chrome-extension://fhbjgbiflinjbdggehcddcbncdddomop",
 //         "postman-token": "04faf82a-4a90-a6b1-fedf-b0d69b9ed07f",
 //         "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36",
 //         "Via": "2.0 24023be0058357255ae877bcdf7f5785.cloudfront.net (CloudFront)",
 //         "X-Amz-Cf-Id": "4gBDnV2zu-HZ44yWixArjTooIkluNgBSpndNQd0Sds3s_aYAocSkjA==",
 //         "X-Amzn-Trace-Id": "Root=1-5c4850c1-bceb713ce63390198dc2fb2c",
 //         "X-Forwarded-For": "106.51.73.130, 52.46.49.75",
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
 //             "bFbFbbFbFbYGNFTSwlegKwDaFaFa2ToNtNzVCQMfLxHCt5aFaFamcH9iqoWUxZ1aFaFaESezx6mVgaZS7AcFcFc"
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
 //         "Host": [
 //             "b3avswn5h0.execute-api.ap-south-1.amazonaws.com"
 //         ],
 //         "origin": [
 //             "chrome-extension://fhbjgbiflinjbdggehcddcbncdddomop"
 //         ],
 //         "postman-token": [
 //             "04faf82a-4a90-a6b1-fedf-b0d69b9ed07f"
 //         ],
 //         "User-Agent": [
 //             "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36"
 //         ],
 //         "Via": [
 //             "2.0 24023be0058357255ae877bcdf7f5785.cloudfront.net (CloudFront)"
 //         ],
 //         "X-Amz-Cf-Id": [
 //             "4gBDnV2zu-HZ44yWixArjTooIkluNgBSpndNQd0Sds3s_aYAocSkjA=="
 //         ],
 //         "X-Amzn-Trace-Id": [
 //             "Root=1-5c4850c1-bceb713ce63390198dc2fb2c"
 //         ],
 //         "X-Forwarded-For": [
 //             "106.51.73.130, 52.46.49.75"
 //         ],
 //         "X-Forwarded-Port": [
 //             "443"
 //         ],
 //         "X-Forwarded-Proto": [
 //             "https"
 //         ]
 //     },
 //     "queryStringParameters": {
 //         "taskId": "29236193"
 //     },
 //     "multiValueQueryStringParameters": {
 //         "taskId": [
 //             "29236193"
 //         ]
 //     },
 //     "pathParameters": null,
 //     "stageVariables": null,
 //     "requestContext": {
 //         "resourceId": "g7l1i6",
 //         "authorizer": {
 //             "principalId": "{\"sub\":\"e08cac38-e213-4474-87c6-00764539d649\",\"role\":1}"
 //         },
 //         "resourcePath": "/task",
 //         "httpMethod": "DELETE",
 //         "extendedRequestId": "T9GOPHPoBcwFodA=",
 //         "requestTime": "23/Jan/2019:11:32:17 +0000",
 //         "path": "/Development/task",
 //         "accountId": "786724127547",
 //         "protocol": "HTTP/1.1",
 //         "stage": "Development",
 //         "domainPrefix": "b3avswn5h0",
 //         "requestTimeEpoch": 1548243137554,
 //         "requestId": "89e73fc3-1f02-11e9-b30c-21e34b95e5d2",
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
 //     "body": null,
 //     "isBase64Encoded": false
 // }

    const getConstant = require('./constant')();
    // const callback = function (err, data) {
    // console.log('callback called+++++++++++++++++++++++++++++++++');
    // console.log(err,data);
    // };
   // const event = require('../../mock').admin.event;
    // event.queryStringParameters = {"data": '{"tasks":["5b8e62c08b3873c00c65d58d", "5b8e899b8b3873867265d5b9"]}'};*/
    exports.handler = (event, context, callback) => {
        console.log(JSON.stringify(event));
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
            db.then(() => task.deleteTask(event, cb, principals)).catch(sendError);

            function sendError(error) {
                console.error('error +++', error);
                result.sendServerError(cb);
            }
        }).catch((err) => {
            console.log(err);
            result.sendServerError(cb);
        });
    };

}
catch (err) {
    console.error('error +++', err);
    result.sendServerError(cb);
}

// zip -r customer_delete *




