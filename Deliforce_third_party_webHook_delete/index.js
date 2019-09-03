let cb;
const result = require('./result');

try {

    const getConstant = require('./constant')();
    // const callback = function (err, data) {
    //     console.log('callback called+++++++++++++++++++++++++++++++++');
    //     console.log(err,data);
    //   };
    //   const event =
    // { resource: '/webhook',
    //     path: '/webhook',
    //     httpMethod: 'DELETE',
    //     headers:
    //     { Accept: '*/*',
    //         'Accept-Encoding': 'gzip, deflate, br',
    //         'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
    //         Authorization: 'eyJraWQiOiJwc0Mwakpxd2V5RCtVM3FYenB2RVZ4SEI3NXdKYUVUcVwvZlNrTitaWExSbz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI5NzNhNzliMi03OTI4LTQ2MzQtYjI1Mi04MzhjNzhjOGU3MDciLCJkZXZpY2Vfa2V5IjoiYXAtc291dGgtMV9kOWI2NTQ1Yi02NjMwLTRjNmQtYjBmYi00M2NlMmQ4ZTM1NGYiLCJldmVudF9pZCI6IjE1MTUwMDU5LTFkZmQtMTFlOS1iOTI1LWI1ZjE1MTI5MjlmNiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE1NDgxMzA4NDMsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5hcC1zb3V0aC0xLmFtYXpvbmF3cy5jb21cL2FwLXNvdXRoLTFfQVFKSnBoRXg0IiwiZXhwIjoxNTQ4MTM0NDQzLCJpYXQiOjE1NDgxMzA4NDMsImp0aSI6ImMzNTAyYjE4LTk5YTAtNDY0Ni05ZmRjLTNhMWRkYTBjNzJhMyIsImNsaWVudF9pZCI6IjUzdDBwbm1zMXE2ZmN1MmpocjVuNG9hY3QzIiwidXNlcm5hbWUiOiI5NzNhNzliMi03OTI4LTQ2MzQtYjI1Mi04MzhjNzhjOGU3MDcifQ.BtNEOV4LazYm7oR1PMPIxBqOhOvIEpxdQ1yPYWn1jmQvp3t3bZdxKHExEA05Kd-zWLRDOoSgz3POfP70hK6aJH03pdkI722Nudq1bnQeRacJ_Z-0rQ1TEhUZSLwJ0idqCa9P2I4azrYTlOWcsSlu173nzjluTC3wKv-4eCTBBjMZsofLKH1psTxLX2IeLRELD8pqv5F9W943NBg_mPikn7a0-WFxB5UPbAVPG2Kv49b1hADRFpUX-kxPzbdtxBN0EkAe9gSYgoOSOPGkiGLCMnMszLCgaiYkL7q4WhqgD7uj4P_-vb2yNUgAYNv3db0uzzSAsNja7ZCHzkiJ6zXghQ',
    //         'cache-control': 'no-cache',
    //         'CloudFront-Forwarded-Proto': 'https',
    //         'CloudFront-Is-Desktop-Viewer': 'true',
    //         'CloudFront-Is-Mobile-Viewer': 'false',
    //         'CloudFront-Is-SmartTV-Viewer': 'false',
    //         'CloudFront-Is-Tablet-Viewer': 'false',
    //         'CloudFront-Viewer-Country': 'IN',
    //         'content-type': 'application/json',
    //         Host: '1hobsh741g.execute-api.ap-south-1.amazonaws.com',
    //         origin: 'chrome-extension://fhbjgbiflinjbdggehcddcbncdddomop',
    //         'postman-token': '2063f8b4-93a8-9329-7dac-bd8c3cf44bc7',
    //         'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
    //         Via: '2.0 60276c945ec58972cc6306cf00aab714.cloudfront.net (CloudFront)',
    //         'X-Amz-Cf-Id': 'CcV6tIS2BtHQ2TCpBz888cvWqzOAA-Jctyi5pJO4OpCvN-LQTVltTQ==',
    //         'X-Amzn-Trace-Id': 'Root=1-5c469b0a-36b7b464fabf78f2ba830474',
    //         'X-Forwarded-For': '106.51.73.130, 52.46.49.76',
    //         'X-Forwarded-Port': '443',
    //         'X-Forwarded-Proto': 'https' },
    //     multiValueHeaders:
    //     { Accept: [ '*/*' ],
    //         'Accept-Encoding': [ 'gzip, deflate, br' ],
    //         'Accept-Language': [ 'en-GB,en-US;q=0.9,en;q=0.8' ],
    //         Authorization: [ 'eyJraWQiOiJwc0Mwakpxd2V5RCtVM3FYenB2RVZ4SEI3NXdKYUVUcVwvZlNrTitaWExSbz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI5NzNhNzliMi03OTI4LTQ2MzQtYjI1Mi04MzhjNzhjOGU3MDciLCJkZXZpY2Vfa2V5IjoiYXAtc291dGgtMV9kOWI2NTQ1Yi02NjMwLTRjNmQtYjBmYi00M2NlMmQ4ZTM1NGYiLCJldmVudF9pZCI6IjE1MTUwMDU5LTFkZmQtMTFlOS1iOTI1LWI1ZjE1MTI5MjlmNiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE1NDgxMzA4NDMsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5hcC1zb3V0aC0xLmFtYXpvbmF3cy5jb21cL2FwLXNvdXRoLTFfQVFKSnBoRXg0IiwiZXhwIjoxNTQ4MTM0NDQzLCJpYXQiOjE1NDgxMzA4NDMsImp0aSI6ImMzNTAyYjE4LTk5YTAtNDY0Ni05ZmRjLTNhMWRkYTBjNzJhMyIsImNsaWVudF9pZCI6IjUzdDBwbm1zMXE2ZmN1MmpocjVuNG9hY3QzIiwidXNlcm5hbWUiOiI5NzNhNzliMi03OTI4LTQ2MzQtYjI1Mi04MzhjNzhjOGU3MDcifQ.BtNEOV4LazYm7oR1PMPIxBqOhOvIEpxdQ1yPYWn1jmQvp3t3bZdxKHExEA05Kd-zWLRDOoSgz3POfP70hK6aJH03pdkI722Nudq1bnQeRacJ_Z-0rQ1TEhUZSLwJ0idqCa9P2I4azrYTlOWcsSlu173nzjluTC3wKv-4eCTBBjMZsofLKH1psTxLX2IeLRELD8pqv5F9W943NBg_mPikn7a0-WFxB5UPbAVPG2Kv49b1hADRFpUX-kxPzbdtxBN0EkAe9gSYgoOSOPGkiGLCMnMszLCgaiYkL7q4WhqgD7uj4P_-vb2yNUgAYNv3db0uzzSAsNja7ZCHzkiJ6zXghQ' ],
    //         'cache-control': [ 'no-cache' ],
    //         'CloudFront-Forwarded-Proto': [ 'https' ],
    //         'CloudFront-Is-Desktop-Viewer': [ 'true' ],
    //         'CloudFront-Is-Mobile-Viewer': [ 'false' ],
    //         'CloudFront-Is-SmartTV-Viewer': [ 'false' ],
    //         'CloudFront-Is-Tablet-Viewer': [ 'false' ],
    //         'CloudFront-Viewer-Country': [ 'IN' ],
    //         'content-type': [ 'application/json' ],
    //         Host: [ '1hobsh741g.execute-api.ap-south-1.amazonaws.com' ],
    //         origin: [ 'chrome-extension://fhbjgbiflinjbdggehcddcbncdddomop' ],
    //         'postman-token': [ '2063f8b4-93a8-9329-7dac-bd8c3cf44bc7' ],
    //         'User-Agent': [ 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36' ],
    //         Via: [ '2.0 60276c945ec58972cc6306cf00aab714.cloudfront.net (CloudFront)' ],
    //         'X-Amz-Cf-Id': [ 'CcV6tIS2BtHQ2TCpBz888cvWqzOAA-Jctyi5pJO4OpCvN-LQTVltTQ==' ],
    //         'X-Amzn-Trace-Id': [ 'Root=1-5c469b0a-36b7b464fabf78f2ba830474' ],
    //         'X-Forwarded-For': [ '106.51.73.130, 52.46.49.76' ],
    //         'X-Forwarded-Port': [ '443' ],
    //         'X-Forwarded-Proto': [ 'https' ] },
    //     queryStringParameters: null,
    //         multiValueQueryStringParameters: null,
    //     pathParameters: null,
    //     stageVariables: null,
    //     requestContext:
    //     { resourceId: 'glnjt8',
    //         authorizer: { principalId: '{"sub":"973a79b2-7928-4634-b252-838c78c8e707","role":1,"_id":"5c344f6984be70012cd6764c"}' },
    //         resourcePath: '/webhook',
    //             httpMethod: 'DELETE',
    //         extendedRequestId: 'T40pmHJXhcwFmdQ=',
    //         requestTime: '22/Jan/2019:04:24:42 +0000',
    //         path: '/Development/webhook',
    //         accountId: '786724127547',
    //         protocol: 'HTTP/1.1',
    //         stage: 'Development',
    //         domainPrefix: '1hobsh741g',
    //         requestTimeEpoch: 1548131082254,
    //         requestId: 'a3bd6336-1dfd-11e9-8a85-ed4f3e0b8265',
    //         identity:
    //         { cognitoIdentityPoolId: null,
    //             accountId: null,
    //             cognitoIdentityId: null,
    //             caller: null,
    //             sourceIp: '106.51.73.130',
    //             accessKey: null,
    //             cognitoAuthenticationType: null,
    //             cognitoAuthenticationProvider: null,
    //             userArn: null,
    //             userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
    //             user: null },
    //         domainName: '1hobsh741g.execute-api.ap-south-1.amazonaws.com',
    //             apiId: '1hobsh741g' },
    //     body: '{\n\t"_id" : "5c45df8e627a2a0d62f6b815"\n}\n',
    //         isBase64Encoded: false }

    // event.body = require('../../mock').data.createTeam;
      exports.handler = (event, context, callback) => {

        console.log(JSON.stringify(event));
        cb = callback;
        context.callbackWaitsForEmptyEventLoop = false;


        getConstant.then(() => {
            //imports
            const db = require('./db').connect();
            const webhook = require('./webhook');
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
            db.then(() => webhook.delete(event, cb, principals)).catch(sendError);

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
