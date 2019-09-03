var managerEvent = {
  type: 'REQUEST',
  methodArn: 'arn:aws:execute-api:ap-south-1:221980681332:8qccyeh61h/Development/GET/driver',
  resource: '/driver',
  path: '/driver',
  httpMethod: 'GET',
  headers:
    {
      Accept: 'application/json, text/plain, */*',
      'CloudFront-Viewer-Country': 'IN',
      'CloudFront-Forwarded-Proto': 'https',
      'CloudFront-Is-Tablet-Viewer': 'false',
      origin: 'http://localhost:4200',
      'CloudFront-Is-Mobile-Viewer': 'false',
      Referer: 'http://localhost:4200/drivers',
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36',
      'X-Forwarded-Proto': 'https',
      'CloudFront-Is-SmartTV-Viewer': 'false',
      Host: '8qccyeh61h.execute-api.ap-south-1.amazonaws.com',
      'Accept-Encoding': 'gzip, deflate, br',
      'X-Forwarded-Port': '443',
      'X-Amzn-Trace-Id': 'Root=1-5abb481a-4b26ecf0ecd97368879ae6a0',
      Via: '2.0 03876b98f2175313627b4f0e6010fa2c.cloudfront.net (CloudFront)',
      Authorization: '42rr1eBtV9hBAEFnZJaFUNi+4OlHYw8kunjnkT/760p7gpajHpUExcVK/EhZdg==',
      'X-Amz-Cf-Id': 'X5TOoKIvseoGjZ2qLvxd1dhj_BxOr2jnfGMh0F3I1Dck5SZyErgKvA==',
      'X-Forwarded-For': '106.51.73.130, 204.246.166.145',
      'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
      'CloudFront-Is-Desktop-Viewer': 'true'
    },
  queryStringParameters: {data: '{"page":1,"limit":10,"filter":{"search":"","state":""}}'},
  pathParameters: {},
  stageVariables: {},
  requestContext:
    {
      resourceId: 'z0rs2n',
      resourcePath: '/driver',
      httpMethod: 'GET',
      extendedRequestId: 'Ecg0GE7YBcwFauQ=',
      requestTime: '28/Mar/2018:07:45:30 +0000',
      path: '/Development/driver',
      accountId: '221980681332',
      protocol: 'HTTP/1.1',
      stage: 'Development',
      requestTimeEpoch: 1522223130273,
      requestId: 'fcfe3110-325b-11e8-9a96-079cab3fe102',
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
    }
};


module.exports = {
  manager: {event: managerEvent},
  driver: {event: {}}
};
