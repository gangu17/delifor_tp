module.exports = {
    admin: {
        event:
            {
                "resource": "/task",
                "path": "/task",
                "httpMethod": "PUT",
                "headers": {
                    "Accept": "*/*",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8",
                    "apikey": "kGUUc8X4aFaFakBVDdE8QbMo0DsuSbFbFbntk5xJ6aKPgia18lrbgv04dsFbFbFbWtsYOsgpOAcFcFc",
                    "CloudFront-Forwarded-Proto": "https",
                    "CloudFront-Is-Desktop-Viewer": "true",
                    "CloudFront-Is-Mobile-Viewer": "false",
                    "CloudFront-Is-SmartTV-Viewer": "false",
                    "CloudFront-Is-Tablet-Viewer": "false",
                    "CloudFront-Viewer-Country": "US",
                    "content-type": "application/json",
                    "Host": "api.deliforce.io",
                    "Referer": "https://app.swaggerhub.com/apis/deliforce/api/1.0.0",
                    "User-Agent": "Amazon CloudFront",
                    "Via": "2.0 404e365835cd77924d63be96eecef146.cloudfront.net (CloudFront), 1.1 4a56dd7b0f0d744a74d9f17893f002c5.cloudfront.net (CloudFront)",
                    "X-Amz-Cf-Id": "wE4BgubDsWv_uWwBcRRWHPABctWe_gOAImXLYe2oxT8O81IGR_PH1w==",
                    "X-Amzn-Trace-Id": "Self=1-5c778971-a3b66fc0267fc18008224c50;Root=1-5c778970-ee72b50c6df6c41e3f4b82ae",
                    "X-Forwarded-For": "106.51.73.130, 52.46.49.168, 10.101.10.230, 18.233.174.81, 70.132.59.83",
                    "X-Forwarded-Port": "443",
                    "X-Forwarded-Proto": "https",
                    "x-swaggerhub-cookie": ""
                },
                "multiValueHeaders": {
                    "Accept": [
                        "*/*"
                    ],
                    "Accept-Encoding": [
                        "gzip, deflate, br"
                    ],
                    "Accept-Language": [
                        "en-GB,en-US;q=0.9,en;q=0.8"
                    ],
                    "apikey": [
                        "kGUUc8X4aFaFakBVDdE8QbMo0DsuSbFbFbntk5xJ6aKPgia18lrbgv04dsFbFbFbWtsYOsgpOAcFcFc"
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
                        "US"
                    ],
                    "content-type": [
                        "application/json"
                    ],
                    "Host": [
                        "api.deliforce.io"
                    ],
                    "Referer": [
                        "https://app.swaggerhub.com/apis/deliforce/api/1.0.0"
                    ],
                    "User-Agent": [
                        "Amazon CloudFront"
                    ],
                    "Via": [
                        "2.0 404e365835cd77924d63be96eecef146.cloudfront.net (CloudFront), 1.1 4a56dd7b0f0d744a74d9f17893f002c5.cloudfront.net (CloudFront)"
                    ],
                    "X-Amz-Cf-Id": [
                        "wE4BgubDsWv_uWwBcRRWHPABctWe_gOAImXLYe2oxT8O81IGR_PH1w=="
                    ],
                    "X-Amzn-Trace-Id": [
                        "Self=1-5c778971-a3b66fc0267fc18008224c50;Root=1-5c778970-ee72b50c6df6c41e3f4b82ae"
                    ],
                    "X-Forwarded-For": [
                        "106.51.73.130, 52.46.49.168, 10.101.10.230, 18.233.174.81, 70.132.59.83"
                    ],
                    "X-Forwarded-Port": [
                        "443"
                    ],
                    "X-Forwarded-Proto": [
                        "https"
                    ],
                    "x-swaggerhub-cookie": [
                        ""
                    ]
                },
                "queryStringParameters": null,
                "multiValueQueryStringParameters": null,
                "pathParameters": null,
                "stageVariables": null,
                "requestContext": {
                    "resourceId": "8xucqk",
                    "authorizer": {
                        "principalId": "{\"sub\":\"1e7e7a2b-81e8-4edc-8e2f-25e6f222dc8b\",\"role\":1}"
                    },
                    "resourcePath": "/task",
                    "httpMethod": "PUT",
                    "extendedRequestId": "VzJptGwPhcwFYdw=",
                    "requestTime": "28/Feb/2019:07:10:41 +0000",
                    "path": "/task",
                    "accountId": "204006638324",
                    "protocol": "HTTP/1.1",
                    "stage": "Prod",
                    "domainPrefix": "api",
                    "requestTimeEpoch": 1551337841362,
                    "requestId": "f51d6bea-3b27-11e9-ba95-bdc638068500",
                    "identity": {
                        "cognitoIdentityPoolId": null,
                        "accountId": null,
                        "cognitoIdentityId": null,
                        "caller": null,
                        "sourceIp": "18.233.174.81",
                        "accessKey": null,
                        "cognitoAuthenticationType": null,
                        "cognitoAuthenticationProvider": null,
                        "userArn": null,
                        "userAgent": "Amazon CloudFront",
                        "user": null
                    },
                    "domainName": "api.deliforce.io",
                    "apiId": "gd3ox9mdy3"
                },
                "body": "{\"taskId\":\"11580314\",\"name\":\"Manager A\",\"email\":\"asdasdasd@asdasd.com\",\"date\":\"2019-02-27T06:02:53.000Z\",\"lastName\":\"last\",\"endDate\":\"2019-02-27T07:02:53.000Z\",\"address\":\"Lourdu Nagar Rd, Lourdu Nagar, Swathantra Nagar, Krishnarajapura, Bengaluru, Karnataka 560049, India\",\"phone\":\"+91 324234234234\",\"isPickup\":true,\"manual\":true,\"businessType\":1,\"orderId\":\"6359086\",\"timezone\":\"Asia/Calcutta\",\"driverId\":\"60374329\",\"description\":\"creating task\",\"latitude\":\"72.00000\",\"longitude\":\"12.434534\",\"images\":[\"\"]}",
                "isBase64Encoded": false
            }


    }

};
