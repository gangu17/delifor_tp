let AWS = require('aws-sdk');
const mongoose = require('mongoose');
const momentTimeZone = require('moment-timezone');
let taskModel= require('./model').Task;
let userModel = require('./model').User;
let email= require('./sendEmail');
let sns = new AWS.SNS();


module.exports = {
  sendPushNotification: notify,
 // sendPushNotificationRequest: request
};


function notify(data, end_point_arn, flage, timeout,i,driverLength,cb,dynamicTone) {
  console.log('data', JSON.stringify(data));
  console.log('data.isPickup', data.isPickup);
  data= data.toObject();
  console.log('name'+ data.name);
  console.log('data.isPickup', data.isPickup);
  console.log('endPoint', end_point_arn);
  let jsonMessage;

  let d = new Date(data.date);
  let tz = (data.timezone) ? data.timezone : 'Asia/Calcutta';
  let m = momentTimeZone.utc(d, "YYYY-MM-DD h:mm:ss A");
  d = m.tz(tz).format("YYYY-MM-DD h:mm:ss A");
  let nStart = d.toString();
  let startArry = [];
  startArry = nStart.split(' ');
  let startTime = startArry[1] + ' ' + startArry[2];
  let Startdate = startArry[0];
  console.log('startArry', startArry);
  console.log('statArry', startArry[1], startArry[2]);
  let endDate = null;
  let endTime = null;
  let auto = 1;
  if (data.endDate) {
    let e = new Date(data.endDate);
    let m = momentTimeZone.utc(e, "YYYY-MM-DD h:mm:ss A");
    d = m.tz(tz).format("YYYY-MM-DD h:mm:ss A");
    let nEnd = d.toString();
    let endArry = [];
    endArry = nEnd.split(' ');
    endTime = endArry[1] + ' ' + endArry[2];
    endDate = endArry[0];
  } else {
    endDate = '';
    endTime = '';
  }
  let _id = data._id;
  let acknowledgementType = data.settings.acknowledgementType;
  let isPickup = (data.isPickup) ? true : false;
  let businessType = data.businessType;
  let taskStatus = data.taskStatus;
  let CustomerName = data.name,
    OrderId = (data.orderId) ? (data.orderId) : '',
    CustomerAddress = data.address.formatted_address;
  console.log('acknowledgeType', acknowledgementType);
  console.log('status', flage);
  let status = flage;
  let message = null;
  let expiry = timeout;
  if (status === 1) {
    message = ' New Task Assigned';
  }
  else if (status === 2) {
    message = 'Task is Updated';
  }
  else if (status === 3) {
    message = 'Task is deleted';
  } else if (status === 4) {
    message = ' New Task Assigned';
  }
  else if(status === 5) {
    message = 'AutoAllocation forcefully assign'
  }

  jsonMessage = {
    "default": "This is the default message",
    "GCM": "{\"delay_while_idle\":true,\"collapse_key\":\"Welcome\",\"data\":{\"OrderId\":\"" + OrderId + "\",\"isPickup\":\"" + isPickup + "\",\"expiry\":\"" + expiry + "\",\"message\":\"" + message + "\",\"status\":\"" + status + "\",\"taskStatus\":\"" + taskStatus + "\",\"businessType\":\"" + businessType + "\",\"acknowledgementType\":\"" + acknowledgementType + "\",\"_id\":\"" + _id + "\",\"CustomerName\":\"" + CustomerName + "\",\"CustomerAddress\":\"" + CustomerAddress + "\",\"startTime\":\"" + startTime + "\",\"Startdate\":\"" + Startdate + "\",\"endTime\":\"" + endTime + "\",\"endDate\":\"" + endDate + "\",\"title\":\"New Task Assigned\",\"auto\":\"" + auto + "\"},\"time_to_live\":125,\"dry_run\":false}",
    "APNS_SANDBOX":"{ \"aps\": { \"alert\": \"Task is assigned\" , \"sound\": \""+ dynamicTone +"\", \"_id\": \""+_id+"\",\"isPickUp\":\""+isPickup+"\",\"taskStatus\": \""+taskStatus+"\",\"status\":\""+status+"\",\"OrderId\":\""+OrderId+"\",\"businessType\":\"" + businessType+ "\",\"acknowledgementType\":\"" + acknowledgementType +"\",\"CustomerName\":\"" + CustomerName +"\",\"CustomerAddress\":\"" + CustomerAddress + "\",\"startTime\":\"" + startTime + "\",\"Startdate\":\"" + Startdate +"\",\"endTime\":\"" + endTime +"\",\"endDate\":\"" + endDate +"\",\"title\":\"New Task Assigned\",\"auto\":\"" + auto +"\" }}"
  };


  console.log('json Message', jsonMessage);
  return new Promise((resolve, reject) => {
    sns.publish({
      Message: JSON.stringify(jsonMessage),      // Required
      MessageStructure: 'json',
      TargetArn: end_point_arn // Required
    }, function (err, data) {
      if (err) {
        console.log('error in sns', err);
        return resolve();
      }else{
        return resolve();
      }
    });
  });
}

//
// function request(end_point_arn,flag) {
//   console.log('status', flag);
//   let status = flag;
//   let value = null;
//
//   if(status ===5){
//     value = 1;
//   }
//
//   jsonMessage = {
//     "default": "This is the request message",
//     "GCM": "{\"data\":{\"request\":\"" + value + "\"}}"
//   };
//
//   console.log('json Message', jsonMessage);
//   return new Promise((resolve, reject) => {
//     sns.publish({
//       Message: JSON.stringify(jsonMessage),      // Required
//       MessageStructure: 'json',
//       TargetArn: end_point_arn // Required
//     }, function (err, data) {
//       if (err) {
//         console.log('error in sns', err);
//         return resolve();
//       }else{
//         return resolve();
//       }
//     });
//   });
// }
