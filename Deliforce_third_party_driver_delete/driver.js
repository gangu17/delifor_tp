const result = require('./result');
const driverModel = require('./model').driverModel;
const TaskModel = require('./model').TaskModel;
const UserPlanModel= require('./model').UserPlansModel;
const helper = require('./util');
const constant = require('./constant')();
const isIt = constant.isIt;
const mongoose = require('mongoose');
const cognito = require('./cognito');
var userId;

module.exports = {
  deleteDriver: (event, cb, principals) => {
    console.log("hello hello");
    const data = helper.getQueryData(event);
    // console.log(data._id);
    const clientId = principals['sub'];
    userId=clientId;
    if (!data) {
      result.invalidInput(cb);
    } else {
      driverModel.findOne({driverId:data.driverId}).then((resultData)=> {
      fetchTask(resultData).then((task) => {
        console.log(task);
        if (task) {
          result.driverHasTask(cb);
        } else {
          return deleteDriver(principals, resultData, clientId, cb);
        }
      }).catch((err) => {
        console.log(err);
        result.sendServerError(cb);
      });
    });
    }
  }
};

function deleteDriver(principals, data, clientId, cb) {
  const driverId = mongoose.Types.ObjectId(data._id);
  return driverModel.findOne({clientId: clientId, _id: driverId})
    .then((driverData) => {
      if (!driverData) {
        result.invalidInput(cb);
      } else {
        if (helper.isAdmin(principals)) {
          return doDelete(driverData);
        } else if (driverData.userRole === constant.ROLE.MANAGER) {
          return doDelete(driverData);
        } else {
          result.sendUnAuth(cb);
        }
      }
    });

  function doDelete(driverData) {
    return cognito.deleteUser(driverData.email).then(() => {
      return driverModel.update({
        _id: driverId,
        clientId: clientId
      }, {isDeleted: constant.isIt.YES})
        .then((data) => {
         return UserPlanModel.findOne({clientId:userId}).then((plans)=>{
           console.log('plans Data'+JSON.stringify(plans));
           const plansData=plans.toObject();
           const finalCount=plansData.agentCount-1;
           return UserPlanModel.update({clientId:userId},{agentCount:finalCount}).then((resp)=>{
             console.log('agent Modified'+JSON.stringify(resp));
             result.sendSuccess(cb, data);
           })
         })

        });
    });
  }

}

function fetchTask(resultData) {
  resultData = resultData.toObject();
   return TaskModel.findOne({
     $and: [{driver: mongoose.Types.ObjectId(resultData._id)},
       {taskStatus: {$in: [constant.TASK_STATUS.INPROGRESS, constant.TASK_STATUS.STARTED, constant.TASK_STATUS.ASSIGNED, constant.TASK_STATUS.ACCEPTED]}}, {isDeleted: isIt.NO}]
   });
}




