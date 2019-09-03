


const helper = require('./util');


//aws middleware
const db = require('./db').connect();
const result = require('./result');

const model = require('./model');

const taskUtil = require('./task');


const appImport = require('./app');
const app = appImport.app;
const upload = appImport.upload;

const event = require('../mock').admin.event;


// upload.any()
app.post('/task/import', upload.single('image'), function (req, res) {
//  const event = req.apiGateway.event;
  result.addHeader(res);

  const principals = helper.getPrincipals(res, event);
  if (!principals) return;

  const clientId = (helper.isAdmin(principals)) ? principals['sub'] : principals['clientId'];

  let businessType;
  let taskModel;
  let settings;
  let csvData;

  taskUtil.fetchSettings(clientId).then((setting) => {
    settings = setting;
    businessType = setting.businessType;
    taskModel = model.task.getTaskModel(Number(businessType));
    return helper.readCsvS3(req.file.key)
  }).then((taskArray) => {
    csvData = taskArray;
    if (!taskArray.length) {
      return Promise.reject({code: 400});
    } else {
      return taskUtil.formValidTaskArray(taskArray, taskModel, businessType, principals, settings, clientId);
    }
  }).then((taskList) => {
    if (taskList.length) {
      return saveTask(taskList).then(() => {
        saveCustomer(taskList).then(() => {
          const failedC = csvData.length - taskList.length;
          result.sendSuccess(res, {sucessCount: taskList.length, faieldCount: failedC});
        });
      });
    } else {
      result.sendSuccess(res, {sucessCount: 0, faieldCount: csvData.length});
    }


  }).catch((error) => {

    if (error.code === 400) {
      result.invalidInput(res);
    } else {
      result.sendServerError(res);
    }
  });

  function saveTask(taskList) {
    return taskModel.insertMany(taskList).then(() => {
      console.log('customer');

      customerModel.insertMany(dataArry, function (error) {

        if (error) {
          res.send('server side error' + error);
        }
        res.json({'sucessCount': sucessCount, 'faieldCount': failureCount});
      })


    });
  }


});

//const businessType=settings.businessType;


db.then(() => {
  console.log('data base connectionestablished')

  let server = app.listen(8081, function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
  });


}).catch((error) => {
  console.log('something went wrong');
  });


module.exports = app;


