const result = require('./result');
const constant = require('./constant');
const csv = require("fast-csv");
const aws = require('aws-sdk');

module.exports = {
  checkFromTrigger: (cb, event) => {
    if (event.fromTrigger) {
      result.fromTrigger(cb);
      return true;
    }
  },


  addHeader: (obj) => {
    obj.header("Access-Control-Allow-Origin", "*");
    obj.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    obj.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  },

  generateRandam: () => {
    return Math.floor(Math.random() * 9000) + 1000;
  },

  setColor: () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  },


  getPrincipals: ( res , event) => {
    const fetch = (obj) => obj.requestContext.authorizer.principalId;
    const principals = getDeep(fetch, event);
    if (!principals) {
      result.sendUnAuth(res);
      return false;
    }
    return JSON.parse(principals);
  },

  getBodyData: (event) => {
    const data = event.body;
    if (data) return JSON.parse(data);
    else return null;
  },

  getQueryData: (event) => {
    const fetch = (obj) => obj.queryStringParameters.data;
    const data = getDeep(fetch, event);
    return (data) ? JSON.parse(data) : data;
  },

  isAdmin: (principal) => {
    if (principal['role'] === constant.ROLE.ADMIN) {
      return true;
    } else {
      return false;
    }
  },

  readCsvS3 : (path) =>{

    return new Promise((resolve, reject)=>{
      const resultSet = [];
      const s3 = new aws.S3();
      const stream = s3.getObject({Bucket: 'deliforce-fileupload', Key: path}).createReadStream();

      csv.fromStream(stream, {headers: true})
        .on("data", function (data) {
          resultSet.push(data);

        }).on("end", function (data) {
            resolve(resultSet);
        });
    });


  }
};

function getDeep(fn, obj) {
  let value;
  try {
    value = fn(obj);
  } catch (e) {
    //console.log(e);
    value = false;
  } finally {
    return value;
  }
}


