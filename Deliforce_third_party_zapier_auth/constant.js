const AWS = require('aws-sdk');
// AWS.config.update({
//   "accessKeyId": "AKIAJ6VRKZG3F7T6TSXQ",
//   "secretAccessKey": "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"
// });
AWS.config.update({correctClockSkew: true});
let constants;
module.exports = (function () {
    if (constants) {
        return constants;
    } else {
        return new Promise((resolve, reject) => {
            const s3 = new AWS.S3();

            // const getParams = {
            //   Bucket: 'devuser-constant', // your bucket name,
            //   Key: 'constant.json' // path to the object you're looking for
            // };

            const getParams = {
                Bucket: process.env.bucketName, // your bucket name,
                Key: process.env.constantFileName // path to the object you're looking for
            };

            s3.getObject(getParams, function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    constants = JSON.parse(data.Body.toString('utf-8'));// Use the encoding necessary
                    resolve(constants);
                }
            });
        });
    }
});
