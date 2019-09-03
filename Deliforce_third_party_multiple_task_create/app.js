const aws = require('aws-sdk');
//aws.config.loadFromPath('./config.json');
aws.config.update({
  signatureVersion: "v4",
  accessKeyId: "AKIAIHTHH6ZCOELVTNKQ",
  secretAccessKey: "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"
});

const multerS3 = require('multer-s3');
const multer = require('multer');
const express = require('express');

const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const app = express();


var Promise = require("bluebird");
var geocoder = Promise.promisifyAll(require('geocoder'));


app.use(compression());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(awsServerlessExpressMiddleware.eventContext());




const s3 = new aws.S3({});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'deliforce-fileupload',
    /*    acl: 'public-read',*/

    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    fileFilter: function (req, file, cb) {
      if (!file.originalname.match(/\.(csv)$/)) {
        return cb(new Error('Only csv files are allowed!'));
      }
      cb(null, true);
    },
    key: function (req, file, cb) {

      cb(null, Date.now() + file.originalname);
    }


  })
});




module.exports = {
  upload :upload,
  app : app
};
