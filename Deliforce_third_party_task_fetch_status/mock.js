module.exports = {
  //yamini


  //get and delete queryStringParameters
  //post/put e
  // email_id: yamini@gmail.com
  // password: Yamini@123
  admin: {
    event:
      {
        "resource": "/task/assigntask",
        "path": "/task/assigntask",
        "httpMethod": "POST",
        "headers": {
          "Accept": "*/*",
          "Accept-Encoding": "gzip, deflate",
          "apiKey": "0FLq6bFbFb0u36TbFbFbNbFbFbTGwgJWek1CREPRbFbFblnpdUra6s77D1fBNFkCLN2Qx0kFghPV3wcFcFc",
          "cache-control": "no-cache",
          "CloudFront-Forwarded-Proto": "https",
          "CloudFront-Is-Desktop-Viewer": "true",
          "CloudFront-Is-Mobile-Viewer": "false",
          "CloudFront-Is-SmartTV-Viewer": "false",
          "CloudFront-Is-Tablet-Viewer": "false",
          "CloudFront-Viewer-Country": "IN",
          "Content-Type": "application/json",
          "Host": "93d6wjitt7.execute-api.ap-south-1.amazonaws.com",
          "Postman-Token": "c9ae7a4f-e2f0-420c-9878-b70fa092426f",
          "User-Agent": "PostmanRuntime/7.1.5",
          "Via": "1.1 70af2c9e785495ba854872c125ca6014.cloudfront.net (CloudFront)",
          "X-Amz-Cf-Id": "FJn2_dUOwlizQuebAE2vQdQdY7N9a2ozOqWhs06hnBNzpcAk-GcYiA==",
          "X-Amzn-Trace-Id": "Root=1-5be44e50-6deaacd9305cb5b97226b0f7",
          "X-Forwarded-For": "106.51.73.130, 52.46.49.84",
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
            "0FLq6bFbFb0u36TbFbFbNbFbFbTGwgJWek1CREPRbFbFblnpdUra6s77D1fBNFkCLN2Qx0kFghPV3wcFcFc"
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
            "93d6wjitt7.execute-api.ap-south-1.amazonaws.com"
          ],
          "Postman-Token": [
            "c9ae7a4f-e2f0-420c-9878-b70fa092426f"
          ],
          "User-Agent": [
            "PostmanRuntime/7.1.5"
          ],
          "Via": [
            "1.1 70af2c9e785495ba854872c125ca6014.cloudfront.net (CloudFront)"
          ],
          "X-Amz-Cf-Id": [
            "FJn2_dUOwlizQuebAE2vQdQdY7N9a2ozOqWhs06hnBNzpcAk-GcYiA=="
          ],
          "X-Amzn-Trace-Id": [
            "Root=1-5be44e50-6deaacd9305cb5b97226b0f7"
          ],
          "X-Forwarded-For": [
            "106.51.73.130, 52.46.49.84"
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
          "resourceId": "3haqur",
          "authorizer": {
            "principalId": "{\"sub\":\"f782bdfb-0dab-4179-b9c1-464f579fa5d6\",\"role\":1}"
          },
          "resourcePath": "/task/assigntask",
          "httpMethod": "POST",
          "extendedRequestId": "QDEsnFKShcwFmLw=",
          "requestTime": "08/Nov/2018:14:55:12 +0000",
          "path": "/Development/task/assigntask",
          "accountId": "204006638324",
          "protocol": "HTTP/1.1",
          "stage": "Development",
          "domainPrefix": "93d6wjitt7",
          "requestTimeEpoch": 1541688912770,
          "requestId": "4b80c6c4-e366-11e8-a095-6ba8c4f5861b",
          "identity": {
            "cognitoIdentityPoolId": null,
            "accountId": null,
            "cognitoIdentityId": null,
            "caller": null,
            "sourceIp": "106.51.73.130",
            "accessKey": null,
            "cognitoAuthenticationType": null,
            "cognitoAuthenticationProvider": null,
            "userArn": null,
            "userAgent": "PostmanRuntime/7.1.5",
            "user": null
          },
          "domainName": "93d6wjitt7.execute-api.ap-south-1.amazonaws.com",
          "apiId": "93d6wjitt7"
        },
        "body": "{\"_id\":\"5c187ea56500c93348086c4c\",\"name\":\"harish\",\"address\":\"TamilNadu,India\"}",
        "isBase64Encoded": false
      }
  },
  //sathish
  manager: {
    event: { resource: '/analytics/topagent',
      path: '/analytics/topagent',
      httpMethod: 'GET',
      headers:
        { Accept: 'application/json, text/plain, */*',
          'Accept-Encoding': 'gzip, deflate, br',
          'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
          Authorization: 'eyJraWQiOiJmVTRLSjVEUmN1MVhXa3hOMFFQOHhLTFJDUWp3NkVIcURLQW4zZlhPbkJVPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI0ODY3YTQwZi0xMWYyLTRlNTQtOGZlZi05M2M1ZjdlNTk3NGYiLCJldmVudF9pZCI6IjRkNTJlNGE5LWMzMDktMTFlOC04Mzg4LWRiZTRiZDk3NjVkMiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE1MzgxMzA1MzUsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5hcC1zb3V0aC0xLmFtYXpvbmF3cy5jb21cL2FwLXNvdXRoLTFfOEZnRlVMc1RvIiwiZXhwIjoxNTM4MTk3ODEzLCJpYXQiOjE1MzgxOTQyMTMsImp0aSI6ImFkN2IxYTA2LWY5OGQtNDY2YS04YmFmLTU5MzU0MmZlYzQ3NiIsImNsaWVudF9pZCI6IjdiZTV0amVhdGJpZnFrNGQxYXJxaTkwbTQ1IiwidXNlcm5hbWUiOiI0ODY3YTQwZi0xMWYyLTRlNTQtOGZlZi05M2M1ZjdlNTk3NGYifQ.S0_athbrRGMBIW8dhRHXYgKaDlaY0buXvrkgRsukoOOnBiSptWlgsAqoF3TAVZKyn6g1Ac6nfRD8FkNuE58UlpPXKgU3voiQOJi4Bg7avsxbqrk9W-nOf48coxHv6L2nVsSzuzB1ZIrHm6TqMPMFFxxl1UVvmN0wCo26otqLKnhyJvgeJ38PBzOIxTfqnSl6iP7nGdo-HbLXGlR3n5NPwtRz0RttvQRt3nb2OmD8Mgi0O6qpwpY4gfiil2oBhXACUvRUXJ5QZaV-D1P5Cngv3ODCfURQpvyz9JFvL5ZAnbmK8_ZVGPlBaWNDZfhxfq1oeuAA-lbDD62gd0os1_SIlg',
          'CloudFront-Forwarded-Proto': 'https',
          'CloudFront-Is-Desktop-Viewer': 'true',
          'CloudFront-Is-Mobile-Viewer': 'false',
          'CloudFront-Is-SmartTV-Viewer': 'false',
          'CloudFront-Is-Tablet-Viewer': 'false',
          'CloudFront-Viewer-Country': 'IN',
          Host: '8qccyeh61h.execute-api.ap-south-1.amazonaws.com',
          origin: 'https://apps.deliforce.io',
          Referer: 'https://apps.deliforce.io/report',
          'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36',
          Via: '2.0 940482e8695da5fdb5cf0f4bf9f97421.cloudfront.net (CloudFront)',
          'X-Amz-Cf-Id': 'V-vjtpdlOCuDLWNofv9PE7zJUhmyxPGUNw-pDTEWYgNta_Z-PsA-vw==',
          'X-Amzn-Trace-Id': 'Root=1-5baf088c-dfd0eb0bf4d9faaf8352e6b9',
          'X-Forwarded-For': '106.51.73.130, 52.46.49.99',
          'X-Forwarded-Port': '443',
          'X-Forwarded-Proto': 'https' },
      multiValueHeaders:
        { Accept: [ 'application/json, text/plain, */*' ],
          'Accept-Encoding': [ 'gzip, deflate, br' ],
          'Accept-Language': [ 'en-GB,en-US;q=0.9,en;q=0.8' ],
          Authorization: [ 'eyJraWQiOiJmVTRLSjVEUmN1MVhXa3hOMFFQOHhLTFJDUWp3NkVIcURLQW4zZlhPbkJVPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI0ODY3YTQwZi0xMWYyLTRlNTQtOGZlZi05M2M1ZjdlNTk3NGYiLCJldmVudF9pZCI6IjRkNTJlNGE5LWMzMDktMTFlOC04Mzg4LWRiZTRiZDk3NjVkMiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE1MzgxMzA1MzUsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5hcC1zb3V0aC0xLmFtYXpvbmF3cy5jb21cL2FwLXNvdXRoLTFfOEZnRlVMc1RvIiwiZXhwIjoxNTM4MTk3ODEzLCJpYXQiOjE1MzgxOTQyMTMsImp0aSI6ImFkN2IxYTA2LWY5OGQtNDY2YS04YmFmLTU5MzU0MmZlYzQ3NiIsImNsaWVudF9pZCI6IjdiZTV0amVhdGJpZnFrNGQxYXJxaTkwbTQ1IiwidXNlcm5hbWUiOiI0ODY3YTQwZi0xMWYyLTRlNTQtOGZlZi05M2M1ZjdlNTk3NGYifQ.S0_athbrRGMBIW8dhRHXYgKaDlaY0buXvrkgRsukoOOnBiSptWlgsAqoF3TAVZKyn6g1Ac6nfRD8FkNuE58UlpPXKgU3voiQOJi4Bg7avsxbqrk9W-nOf48coxHv6L2nVsSzuzB1ZIrHm6TqMPMFFxxl1UVvmN0wCo26otqLKnhyJvgeJ38PBzOIxTfqnSl6iP7nGdo-HbLXGlR3n5NPwtRz0RttvQRt3nb2OmD8Mgi0O6qpwpY4gfiil2oBhXACUvRUXJ5QZaV-D1P5Cngv3ODCfURQpvyz9JFvL5ZAnbmK8_ZVGPlBaWNDZfhxfq1oeuAA-lbDD62gd0os1_SIlg' ],
          'CloudFront-Forwarded-Proto': [ 'https' ],
          'CloudFront-Is-Desktop-Viewer': [ 'true' ],
          'CloudFront-Is-Mobile-Viewer': [ 'false' ],
          'CloudFront-Is-SmartTV-Viewer': [ 'false' ],
          'CloudFront-Is-Tablet-Viewer': [ 'false' ],
          'CloudFront-Viewer-Country': [ 'IN' ],
          Host: [ '8qccyeh61h.execute-api.ap-south-1.amazonaws.com' ],
          origin: [ 'https://apps.deliforce.io' ],
          Referer: [ 'https://apps.deliforce.io/report' ],
          'User-Agent': [ 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36' ],
          Via: [ '2.0 940482e8695da5fdb5cf0f4bf9f97421.cloudfront.net (CloudFront)' ],
          'X-Amz-Cf-Id': [ 'V-vjtpdlOCuDLWNofv9PE7zJUhmyxPGUNw-pDTEWYgNta_Z-PsA-vw==' ],
          'X-Amzn-Trace-Id': [ 'Root=1-5baf088c-dfd0eb0bf4d9faaf8352e6b9' ],
          'X-Forwarded-For': [ '106.51.73.130, 52.46.49.99' ],
          'X-Forwarded-Port': [ '443' ],
          'X-Forwarded-Proto': [ 'https' ] },
      queryStringParameters: { data: '{"filter":{"dateRangeFilter":["2018-09-29T05:05:05.900Z","2018-09-29T05:05:05.900Z"]}}' },
      multiValueQueryStringParameters: { data: [ '{"filter":{"dateRangeFilter":["2018-09-29T05:05:05.900Z","2018-09-29T05:05:05.900Z"]}}' ] },
      pathParameters: null,
      stageVariables: null,
      requestContext:
        { resourceId: '4t8tuq',
          authorizer: { principalId: '{"sub":"4867a40f-11f2-4e54-8fef-93c5f7e5974f","role":1,"_id":"5badb1c8fa98eec0e5865ea0"}' },
          resourcePath: '/analytics/topagent',
          httpMethod: 'GET',
          extendedRequestId: 'N95F8G5gBcwFQDA=',
          requestTime: '29/Sep/2018:05:07:24 +0000',
          path: '/Development/analytics/topagent',
          accountId: '221980681332',
          protocol: 'HTTP/1.1',
          stage: 'Development',
          requestTimeEpoch: 1538197644423,
          requestId: '8d6819df-c3a5-11e8-9b8a-bb11ac9d2b94',
          identity:
            { cognitoIdentityPoolId: null,
              accountId: null,
              cognitoIdentityId: null,
              caller: null,
              sourceIp: '106.51.73.130',
              accessKey: null,
              cognitoAuthenticationType: null,
              cognitoAuthenticationProvider: null,
              userArn: null,
              userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36',
              user: null },
          apiId: '8qccyeh61h' },
      body: null,
      isBase64Encoded: false }
  }
};

//  const principal = getSub(() => event.requestContext.authorizer.principalId);
// const clientId = principal.sub;
