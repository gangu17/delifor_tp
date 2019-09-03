const result = require('./result');
const model = require('./model');
const helper = require('./util');
const mongoose = require('mongoose');
const moment = require('moment-timezone');
const emailSms = require('./emailSms');
const constant = require('./constant')();
const taskConst = constant.TASK_STATUS;
const userModel = model.userModel;
const settingModel = model.settingModel;
const notification = require('./notify');
const smsKey = constant.SMS_KEY;
const sendGridKey = constant.SENDGRID;
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(sendGridKey.API_KEY);
const AWS = require('aws-sdk');
const lambda = new AWS.Lambda();

const msg91 = require('msg91')(smsKey.API_KEY, smsKey.SENDER_ID, smsKey.ROUTE_NO);

module.exports = {

  updateTaskStatus: (event, cb, principals) => {
    console.log(event);
    const data = helper.getBodyData(event);
    console.log('data', JSON.stringify(data));
    if (!data) {
      result.invalidInput(cb);
    } else {
      const clientId = principals['sub'];
      const taskModel = model.task.getTaskModel(data['businessType']);
      let finalResult;
      taskModel.update({taskId: data.taskId, clientId: clientId}, {taskStatus: data.taskStatus}).then((result) => {
        finalResult = result;
        return fetchTaskDetails(data.taskId, taskModel, clientId)
      }).then((res) => {
        result.sendSuccess(cb, finalResult);
      }).catch((err) => {
        console.log(err);
        result.sendServerError(cb)
      });
    }
  }
};


// return taskModel.findOne({'_id': mongoose.Types.ObjectId(item)}, function (err, results) {
//    if (err) {
//      console.log(err);
//    } else {
//      console.log('calld the getDeta');
//      return snsPushNotification(results._doc);
//    }
//  })
// function getDetails(data, taskModel) {
//   let promiseArry=[];
//    data.forEach((item) => {
//      console.log('called fetchTaskDetails loop');
//      promiseArry.push(fetchTaskDetails(item,taskModel))
//   });
//    return Promise.all(promiseArry)
// }

function fetchTaskDetails(item, taskModel, clientId) {
  return taskModel.findOne({'taskId': item})
    .then((results) => {
      const taskDetails = (results) ? results.toObject() : null;
      console.log('called fetchTaskDetails', taskDetails);
      let adminArray = [];
      adminArray.push(clientId);
      return userModel.find({'_id': mongoose.Types.ObjectId(taskDetails.driver)}).then((userRes) => {
        console.log('userRes', JSON.stringify(userRes));
        userRes = (userRes[0]) ? userRes[0].toObject() : null;
        console.log(userRes.assignTeam);
        return userModel.find({'teams': mongoose.Types.ObjectId(userRes.assignTeam)}).then((manager) =>{
          console.log('manager', JSON.stringify(manager));
          manager.forEach((ele) => {
            console.log('ele', JSON.stringify(ele));
            ele = (ele) ? ele.toObject() : null;
            adminArray.push(ele.cognitoSub);
          });
          taskDetails.adminArray = adminArray;
          console.log('adminArray', JSON.stringify(taskDetails));
          return callMqttLambda(taskDetails).then(() => {
            return snsPushNotification(taskDetails);
          });
        });
      });
    }).catch((err) => {
      console.log('fetchTAskDetails', err);
    });

}

function callMqttLambda(data) {
  let params = {
    FunctionName: 'taskMqttLambda', // the lambda function we are going to invoke
    InvokeArgs: JSON.stringify({data: data})
  };
  return new Promise((resolve, reject) => {
    lambda.invokeAsync(params, function (err, data) {
      if (err) {
        return resolve(console.log(err));
      }
      else {
        return resolve(console.log(data));
      }
    })
  });
}

function snsPushNotification(data) {
  return getCompanyDriver(data).then((result) => {
    console.log('called getCompanyDriver');
    const adminDetails = (result[0]) ? result[0].toObject() : null;
    const driverDetails = (result[1]) ? result[1].toObject() : null;
    let promiseArry = [invoke_sns_lambda(data, adminDetails, driverDetails)];
    if (driverDetails) {
      promiseArry.push(push_notification(data, driverDetails, 2));
    }
    return Promise.all(promiseArry)
  })
}

function push_notification(data, driverDetails, flag) {
  if (data.taskStatus !== taskConst.SUCCESS) {
    let payload = {
      'taskDetails': data,
      'endArn': (driverDetails.endpointArn) ? driverDetails.endpointArn : '',
      'flage': flag
    };
    return notification.call(payload);
  } else {
    return Promise.resolve({'msg': 'successfull task isnt notified to driver'});
  }
}


function invoke_sns_lambda(data, adminDetails, driverDetails) {
  if (data.taskStatus === taskConst.STARTED || data.taskStatus === taskConst.SUCCESS || data.taskStatus === taskConst.FAILED) {
    const payload = {
      pickUp: getBussinessType(data),
      clientId: data.clientId,
      buisnessType: data.buisnessType,
      trigger: getTaskStatus(data.taskStatus),
      number: data.phone,
      email: data.email,
      taskId: data.taskId,
      CustomerName: data.name,
      StartDate: moment(data.date).format("DD-MM-YYYY"),
      StartTime: moment(data.date).tz(data.timezone).format("hh:mm:A"),
      EndDate: moment(data.endDate).format("DD-MM-YYYY"),
      EndTime: moment(data.endDate).tz(data.timezone).format("hh:mm:A"),
      AgentName: (driverDetails) ? driverDetails.name : '',
      OrderId: data.orderId,
      CustomerAddress: data.address.formatted_address,
      CompanyName: (adminDetails && adminDetails.companyName) ? adminDetails.companyName : ''

    };
    console.log('invoke_sns', JSON.stringify(payload));
    // return emailSms.call(payload);
    return getNotifications(payload).then((notification) => {
      // console.log('After getting Notification : ',JSON.stringify(notification.notifications));
      console.log('After getting Notification : ', JSON.stringify(notification.notifications[payload.trigger]));
      const notify = notification.notifications[payload.trigger];
      //console.log('Notitfy : ' ,notify);
      if (notify['sms'] === true && notify['email'] === true) {
        smsTemp = getTemplate(notify['smsTemp'], payload);
        mailTemp = getTemplate(notify['mailTemp'], payload);
        // console.log('Mail Temp : ' ,mailTemp);
        if (smsTemp && mailTemp) {
          return Promise.all([sendSMS(payload, smsTemp), sendEmail(payload, mailTemp)])

        }

      } else if (notify['sms'] === true) {
        smsTemp = getTemplate(notify['smsTemp'], payload);
        return sendSMS(payload, smsTemp);


      } else if (notify['email'] === true) {
        mailTemp = getTemplate(notify['mailTemp'], payload);
        console.log('Mail Temp 1: ', mailTemp);
        return sendEmail(payload, mailTemp)

      }
    }).catch((err) => {
      console.log('err++++ ', JSON.stringify(err));
      return Promise.resolve({'msg': 'failed'})

    });

  } else {
    return Promise.resolve({'message': 'task status doesnt need mailSms trigger'});
  }
}

function getBussinessType(data) {
  if (data.isPickup) {
    return 'pick-up';
  } else {
    if (data['businessType'] === business.PICKUP) {
      return 'delivery';
    } else {
      return (data['businessType'] === business.APPOINTMENT) ? 'appoinment' : 'field-work-force'
    }
  }
}

//
// function getDriverDetails(){
//   return userModel.findOne()
// }

function getCompanyDriver(data) {
  let promisArry = [userModel.findOne({'cognitoSub': data.clientId})];
  if (data.driver) {
    promisArry.push(userModel.findOne({'_id': mongoose.Types.ObjectId(data.driver)}))
  }
  return Promise.all(promisArry)
}

function getTaskStatus(taskStatus) {
  const TaskStatus = taskConst;
  for (const key in  TaskStatus) {
    if (TaskStatus.hasOwnProperty(key)) {
      if (TaskStatus[key] === taskStatus) {
        const lowKey = key.toLowerCase();
        String.prototype.capitalize = function () {
          return this.charAt(0).toUpperCase() + this.slice(1);
        };
        return lowKey.capitalize();
      }
    }
  }
}


function sendEmail(data, emailTemp) {
  return new Promise((resolve, reject) => {
    console.log('mailTemp;;;;;;;;', emailTemp);
    console.log('sending email here and then to inbox');
    const param = getParams(data, emailTemp);
    console.log('Parameter : ' + JSON.stringify(param));
    sgMail.send(param, function (err, msg) {
      console.log(err, msg);
      if (err) {
        return resolve({'msg': 'email err'})
      }
      else {
        console.log("===EMAIL SENT===");
        return resolve('mail sent');
      }
    });

  });

}

function sendSMS(data, smsTemp) {
  return new Promise((resolve, reject) => {
    const mobileNo = getmobileNo(data);
    console.log(mobileNo);
    msg91.send(mobileNo, smsTemp, function (err, response) {
      if (err) {
        return resolve({'msg': 'sms err'});
      }
      else {
        console.log('success');
        console.log(response);
        return resolve({'message': 'sending sms is sucessful'});

      }
    });
  });
}

function getParams(data, emailTemp) {
  const params = {
    to: data.email,
    from: 'support@deliforce.io',
    subject: 'Task Notification',
    html: emailTemp
  };
  return params;
}

function getmobileNo(data) {
  const phone = data.number.substr(data.number.indexOf('+')+1);
    let finalPhone = phone.replace(' ','');
    let countryCode = '0';

  const mobileNo = countryCode + finalPhone;
  console.log(mobileNo, 'mobileNo');
  return mobileNo;
}


function getNotifications(data) {
  return settingModel.findOne({clientId: data.clientId, isCurrent: true}, {notifications: 1})
}


function getTemplate(template, data) {

  let content = {};
  let regX = /USER_NAME|CustomerName|CustomerAddress|AgentName|EndTime|EndDate|OrderId|StartDate|StartTime|TrackingLink|CompanyName|CompletedTime|pickUp|taskId/gi;
  let emailContent = template.replace(/[\[\]']+/g, ''); // first remove the [] ;
  content = emailContent.replace(regX, function (matched) {
    return data[matched];
  });
  return content;
}
