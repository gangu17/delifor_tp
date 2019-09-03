module.exports = {
  event: {
    resource: '/team',
    path: '/team',
    httpMethod: 'GET',
    headers:
      {
        Accept: 'application/json, text/plain, */*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.9',
        Authorization: 'eyJraWQiOiJmVTRLSjVEUmN1MVhXa3hOMFFQOHhLTFJDUWp3NkVIcURLQW4zZlhPbkJVPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIyM2RlNTg3OS1lYjFhLTQwYTQtOWUzYi01MmQzNDJmMzY0OTAiLCJldmVudF9pZCI6IjU2ZDFhODdhLTI4NTItMTFlOC1hMGE1LTk5YWYzMmE0ZWZmNyIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE1MjExMTk0NzQsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5hcC1zb3V0aC0xLmFtYXpvbmF3cy5jb21cL2FwLXNvdXRoLTFfOEZnRlVMc1RvIiwiZXhwIjoxNTIxMTIzMDc0LCJpYXQiOjE1MjExMTk0NzQsImp0aSI6ImY3NTc4MDRlLTY3OTAtNDQyZC1iYWJmLTM3MmMxMDY4MDljZSIsImNsaWVudF9pZCI6IjdiZTV0amVhdGJpZnFrNGQxYXJxaTkwbTQ1IiwidXNlcm5hbWUiOiIyM2RlNTg3OS1lYjFhLTQwYTQtOWUzYi01MmQzNDJmMzY0OTAifQ.BBRJb6Pz-X-_CK4pjk1lbCABi1YiaWx4dBGE43x1eu2M0EYA_0awEAQQRc6cUnBbYbhn4wc3cbGeUyjXJGkKBo0Ninj5j4lukIjfczJO3hFHyJKuNDnLSlkY7DS6EY-WvuBuzOBawlRZ8uTv3ypcFaZAZ-5y5_FYkkmkBOMwe5vzEwI7ooaF-843Z0dPBsOxf8TG59f3QYTSLasSKMF2KEp5svJZa3oBZ2k8L0vpnkgC7TNJvcJsZrr55R7b_LDmffy0vi_p0wvvm3b47dOBmBcmZEkUORefckFdnoeZNSNOHDjs-HbOI13x0fLlrFlCb-VcGtC17nRP2DAluTsaXA',
        'CloudFront-Forwarded-Proto': 'https',
        'CloudFront-Is-Desktop-Viewer': 'true',
        'CloudFront-Is-Mobile-Viewer': 'false',
        'CloudFront-Is-SmartTV-Viewer': 'false',
        'CloudFront-Is-Tablet-Viewer': 'false',
        'CloudFront-Viewer-Country': 'IN',
        Host: '8qccyeh61h.execute-api.ap-south-1.amazonaws.com',
        origin: 'http://localhost:4200',
        Referer: 'http://localhost:4200/teams',
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36',
        Via: '2.0 e8211ae0170c9ccd38bcd06c168293e9.cloudfront.net (CloudFront)',
        'X-Amz-Cf-Id': 'G90uq4BczpAI8Wd2Q9BLzB8pgJKwHVJdnvN0baRUUvbYb7JB__pgiw==',
        'X-Amzn-Trace-Id': 'Root=1-5aaa7794-acbe6f40e78336205fb83220',
        'X-Forwarded-For': '106.51.73.130, 54.239.160.112',
        'X-Forwarded-Port': '443',
        'X-Forwarded-Proto': 'https'
      },
    queryStringParameters: {data: '{"page":1,"limit":10,"filter":{"search":""}}'},
    pathParameters: null,
    stageVariables: null,
    requestContext:
      {
        resourceId: 'km3845',
        authorizer: {principalId: '{"sub":"23de5879-eb1a-40a4-9e3b-52d342f36490","role":1,"_id":"5aa282c21623d9d0365eff3b"}'},
        resourcePath: '/team',
        httpMethod: 'GET',
        requestTime: '15/Mar/2018:13:39:32 +0000',
        path: '/Development/team',
        accountId: '221980681332',
        protocol: 'HTTP/1.1',
        stage: 'Development',
        requestTimeEpoch: 1521121172584,
        requestId: '4b06de9e-2856-11e8-a47e-a59e7436b8d7',
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
    body: null,
    isBase64Encoded: false
  },
  managerPrincipal: {
    sub: '80bfae83-2983-41ce-8961-23e2bcc2571b', role: 2,
    clientId: '23de5879-eb1a-40a4-9e3b-52d342f36490', teams: ['5aaa6c6fd25929612872c2ef', '5aaa6c6fd25929612872c2f1']
  },
  adminPrincipal: {
    sub: '23de5879-eb1a-40a4-9e3b-52d342f36490', role: 1,
  }
}
