const driverModel = require('./model').userModel;
const customerModel = require('./model').customerModel;
const settingsModel = require('./model').settingModel;
const _ = require('lodash');
const helper = require('./util');
const constant = require('./constant');
const moment = require('moment');
const geocoder = require('geocoder');
const taskS = require('./constant').TASK_STATUS;



module.exports = {

  fetchSettings: function (clientId) {
    return settingsModel.find({clientId: clientId, isCurrent: true}, {businessType: 1})
      .then(function (setting) {
        if (!setting.length) {
          return Promise.reject();
        }
        return setting[0];
      })

  },

  formValidTaskArray: validateTask

};


function validateTask(taskList, taskModel, businessType, principals, setting, clientId) {
  const dataArry = [];
  const promiseArr = [];

  return fetchDrivers(taskList, clientId).then((drivers) => {

    for (let i = 0; i < taskList.length; i++) {
      const promise = formTaskData(taskList[i], taskModel, businessType, principals, setting, clientId, drivers)
        .then((data) => {
          dataArry.push(data);
        }).catch((err) => {
          console.log('error', err);
        });
      promiseArr.push(promise);
    }

    return Promise.all(promiseArr).then(() => dataArry);

  });

  function formTaskData(data, taskModel, businessType, principals, setting, clientId, drivers) {

    return new Promise((resolve, reject) => {

      if (!validateDate(data, businessType)) {
        reject();
      } else {
        const formedData = _.pick(data, ['name', 'phone', 'date', 'endDate', 'orderId', 'driver']);
        _.assign(formedData, taskCommon(setting, principals, businessType, clientId));

        geocoder.geocode(data.address, (err, address) => {
          if (err || !address.results.length) {
            reject();
          } else {
            formedData.address = address.results[0];
            attachDriver(formedData, drivers, data);
            testTaskData();
          }
        });

        function testTaskData() {

          const driverData = new taskModel(formedData);
          driverData.validate((err) => {
            if (err) {
              reject(err);
            } else {
              resolve(formedData);
            }
          })
        }

      }
    });
  }

}


function validateDate(data, businessType) {
  const business = constant.BUSINESS_TYPE;

  if (checkCurrentDate(data.date)) {
    if (businessType === business.PICKUP) {
      return true;
    } else if (businessType === business.APPOINTMENT || businessType === business.FIELD) {
      return compareStartEnd(data.date, data.endDate);
    } else {
      //result.businessMissing(cb);
      return false;
    }

  }

  function compareStartEnd(start, end) {
    const momentStart = moment(start);
    const momentEnd = moment(end);
    return !!(momentEnd.isAfter(momentStart));
    //result.endLesserThanStart(cb);
  }


  function checkCurrentDate(date) {
    const momentDate = moment(date);
    const momentCurrent = moment().subtract(10, 'minute');

    if (!momentDate.isValid()) {
      return false;
    } else {
      if (momentDate.isSameOrAfter(momentCurrent)) {
        return true
      } else {
        return false;
      }
    }
  }

}

function fetchDrivers(taskList, clientId) {
  const emails = taskList.map((task) => task.email);
  const emailArray = _.uniq(emails.filter((t) => !!t));
  return driverModel.find({clientId: clientId, email: {$in: emailArray}});
}


function attachDriver(formedData, drivers, data) {
  function matchDriver() {
    return drivers.filter((d) => d.email === data.email);
  }

  if (data.driver && matchDriver().length) {
    formedData.taskStatus = taskS.ASSIGNED;
    formedData.driver = driverMatch[0]._id;

  } else {
    formedData.taskStatus = taskS.UNASSIGNED
  }
}


function taskCommon(setting, principals, businessType, clientId) {
  return {
    clientId: clientId, color: helper.setColor(),
    businessType: businessType, settings: setting, userRole: principals.role, user: principals.sub
  };
}



