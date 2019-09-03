module.exports = {
  event: {
    resource: '/manager',
    path: '/manager',
    httpMethod: 'GET',
    headers:
      {
        Accept: 'application/json, text/plain, */*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.9',
        Authorization: 'eyJraWQiOiJmVTRLSjVEUmN1MVhXa3hOMFFQOHhLTFJDUWp3NkVIcURLQW4zZlhPbkJVPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJiM2E1MGNjNC04ZGU1LTRlY2MtOTM0ZC1iM2NhNjYzOTU5MTciLCJldmVudF9pZCI6Ijk5MjFhMjhhLTI4OTAtMTFlOC04ZWVlLTc1ZTI3ZDZkOTNkZCIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE1MjExNDYyMTQsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5hcC1zb3V0aC0xLmFtYXpvbmF3cy5jb21cL2FwLXNvdXRoLTFfOEZnRlVMc1RvIiwiZXhwIjoxNTIxMTQ5ODE0LCJpYXQiOjE1MjExNDYyMTQsImp0aSI6IjkwNDNmY2U2LWJmNmQtNDgwZi04ZjBlLWE1NjA3ZTI2MTMyYSIsImNsaWVudF9pZCI6IjdiZTV0amVhdGJpZnFrNGQxYXJxaTkwbTQ1IiwidXNlcm5hbWUiOiJiM2E1MGNjNC04ZGU1LTRlY2MtOTM0ZC1iM2NhNjYzOTU5MTcifQ.MnUuv3bMXwhw5_2AR8WYZaXcvjL0F8771ECSfosfxsLpTeRD7pDlycBVJPAsVxXGCQA6KJz1CMYmJc5eSt-hodKcni1dbIJ-sYPNJZvckVTSbulFw5Fr_5FIdHISdFoU0niuJS7FbIy-aY3hrlsXS4ybqu-njWYM56cGycY0TJ5O8yMM8KHpTRw7S5nECYTJBwJ6fcZIcouJh88w3MzZTFX73X3JxaO1lbNIOPWfCJ8gwHBedzlHK_o8boNAFdwM_e_RCkPtnuPBsjTgYrmZlc1YcFWeqQ7DpmgpaILqnz1kZoH_17sodl8mTFt2yMAZpfFYAfAKcTKYkW6KplwyVg',
        'CloudFront-Forwarded-Proto': 'https',
        'CloudFront-Is-Desktop-Viewer': 'true',
        'CloudFront-Is-Mobile-Viewer': 'false',
        'CloudFront-Is-SmartTV-Viewer': 'false',
        'CloudFront-Is-Tablet-Viewer': 'false',
        'CloudFront-Viewer-Country': 'IN',
        Host: '8qccyeh61h.execute-api.ap-south-1.amazonaws.com',
        origin: 'http://localhost:4200',
        Referer: 'http://localhost:4200/managers',
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36',
        Via: '2.0 defdb7d9bab9d18be88a1e6f7db30215.cloudfront.net (CloudFront)',
        'X-Amz-Cf-Id': 'l3sQOHqCs2tcLgA52I7I39A0A65wMpEu2D4-iO-C7Pwu_cTm9KWN6g==',
        'X-Amzn-Trace-Id': 'Root=1-5aaad970-d9dec02078eb71e006e13850',
        'X-Forwarded-For': '106.51.73.130, 54.239.160.5',
        'X-Forwarded-Port': '443',
        'X-Forwarded-Proto': 'https'
      },
    queryStringParameters: {data: '{"page":1,"limit":10,"filter":{"search":""}}'},
    pathParameters: null,
    stageVariables: null,
    requestContext:
      {
        resourceId: 'cswu7w',
        authorizer: {principalId: '{"sub":"b3a50cc4-8de5-4ecc-934d-b3ca66395917","role":1,"_id":"5aaaca86b8aeef840817bfef"}'},
        resourcePath: '/manager',
        httpMethod: 'GET',
        requestTime: '15/Mar/2018:20:37:04 +0000',
        path: '/Development/manager',
        accountId: '221980681332',
        protocol: 'HTTP/1.1',
        stage: 'Development',
        requestTimeEpoch: 1521146224688,
        requestId: '9f3e9354-2890-11e8-9c0b-3f97e930b286',
        identity:
          {
            cognitoIdentityPoolId: null,
            accountId: null,
            cognitoIdentityId: null,
            caller: null,
            sourceIp: '106.51.73.130',
            accessKey: null,
            cognitoAuthenticationType: null,
            cognitoAuthenticationProvider: null,
            userArn: null,
            userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36',
            user: null
          },
        apiId: '8qccyeh61h'
      },
    body: '{"email":"rajas@gmail.com","phone":"+91 48233222323","name":"rajas","password":"Rajas@123","permissions":{"allowAccessToUnassigned":false,"allowCreateTask":true,"allowEditTask":false,"allowAddDriver":true}}',
    isBase64Encoded: false
  },

  managerPrincipal: {
    sub: '80bfae83-2983-41ce-8961-23e2bcc2571b', role: 2,
    clientId: '23de5879-eb1a-40a4-9e3b-52d342f36490', teams: ['5aaa6c6fd25929612872c2ef', '5aaa6c6fd25929612872c2f1']
  },
  adminPrincipal: {
    sub: '23de5879-eb1a-40a4-9e3b-52d342f36490', role: 1,
  },

  data: {
    email: 'eshwar@gmail.com', phone: '+91 43233222323', name: 'arul', password: 'Eshwar@123',
    permissions: {
      allowAccessToUnassigned: false,
      allowCreateTask: true,
      allowEditTask: false,
      allowAddDriver: true
    }
  }
};
