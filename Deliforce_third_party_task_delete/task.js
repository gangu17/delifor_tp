const result = require('./result');
const helper = require('./util');
const constant = require('./constant')();
const driverConst = constant.DRIVER_STATUS;
const taskConst = constant.TASK_STATUS;
const taskModel = require('./model').TASK;
const plansModel = require('./model').USERPLAN;
const UserModel = require('./model').USER;
const notificationModel = require('./model').NOTIFICATIONS;
const isIt = constant.isIt;
const mongoose = require('mongoose');
const _ = require('lodash');
const notification = require('./notify');
const rp = require('request-promise');
const webhookModel = require('./model').WEBHOOK;
var userId;
module.exports = {
//princial manager- clientId , role , sub , teams
//admin - sub , role


    deleteTask: (event, cb, principals) => {
        const clientId = principals['sub'];
        userId = clientId;
        if (!clientId) {
            result.sendUnAuth(cb);
        } else {
            const data = helper.getQueryData(event);
            console.log('helllllllllllllllllo' + JSON.stringify(data));
            if (!data) {
                console.log('helllllllllllllllllo');
                result.invalidInput(cb);
            } else {
                deleteTask(clientId, principals, cb, data);
            }
        }
    }
};

function deleteTask(clientId, principals, cb, data) {

    if (data.taskId) {
        console.log('helllllllllllllllllo');
        const taskId = data.taskId;
        taskModel.findOne({taskId: taskId, clientId: clientId})
            .then((taskData) => {
                const taskRole = taskData.userRole || taskData._doc.userRole;
                if (helper.isAdmin(principals)) {
                    return doDelete(taskData);
                } else if (taskRole === constant.ROLE.MANAGER) {
                    return doDelete(taskData);
                } else {
                    result.sendUnAuth(cb);
                }


                function doDelete(taskData) {
                    console.log(userId);
                    console.log('helllllllllllllllllo');
                    return taskModel.update({taskId: taskId, clientId: clientId}, {isDeleted: isIt.YES, taskStatus: 14},{multi: true}).then((response) => {
                        return webhookModel.find({clientId: clientId, isDeleted: isIt.NO}).then((webhookData) => {
                            console.log(webhookData);
                            taskModel.findOne({taskId: taskId}).then((taskDetails) => {
                                taskDetails = taskDetails.toObject();
                                let url;
                                let triggerName;
                                let method = 'POST';
                                console.log('webHookArr', JSON.stringify(webhookData));
                                for (let i = 0; i < webhookData.length; i++) {
                                    webhookData[i] = webhookData[i].toObject();
                                    if (webhookData[i].trigger === taskDetails.taskStatus) {
                                        url = webhookData[i].url;
                                        triggerName = webhookData[i].triggerName;
                                    }
                                }
                                let options = {
                                    method: method,
                                    uri: url,
                                    body: {
                                        triggerName: triggerName,
                                        taskId: taskDetails.taskId,
                                        deleted: true
                                    },
                                    json: true
                                };
                                rp(options)
                                    .then(() => {
                                        console.log('body', JSON.stringify(options.body));
                                    })
                                    .catch((err) => {
                                        console.log('err', JSON.stringify(err));
                                    });
                                return plansModel.findOne({clientId: userId}).then((planData) => {
                                    console.log('plans Update' + JSON.stringify(planData));
                                    const plans = planData.toObject();
                                    const changeCount = plans.taskCount - 1;
                                    return Promise.all([plansModel.update({clientId: userId}, {taskCount: changeCount}), checkDriverExist(taskData)])
                                        .then((mod) => {
                                            console.log('plnassss' + JSON.stringify(mod));
                                            result.sendSuccess(cb, response);
                                        })
                                })
                            })

                        }).catch((err) => {
                            console.log(err);
                            result.sendServerError(cb)
                        });
                    }).catch((err) => {
                        console.log(err);
                        result.sendServerError(cb);
                    });
                }
            });
    }
    else {
        var taskArray = [];
        let finalResult;
        taskArray = data.tasks;
        taskModel.update({_id: {$in: taskArray}, clientId: clientId}, {
            isDeleted: isIt.YES,
            taskStatus: 14
        }, {multi: true})
            .then((response) => {
                finalResult = response;
                return getDetails(taskArray);
            }).then((res) => {
            result.sendSuccess(cb, finalResult);
        }).catch((error) => {
            console.log(error);
            result.sendServerError(cb)
        });
    }
}


function getDetails(data) {
    console.log(data);
    let promiseArry = [];
    data.forEach((item) => {
        console.log('called fetchTaskDetails loop');
        promiseArry.push(fetchTaskDetails(item));
    });
    return Promise.all(promiseArry)
}


function fetchTaskDetails(item) {
    return taskModel.findOne({'_id': mongoose.Types.ObjectId(item)})
        .then((results) => {
            console.log('called fetchTaskDetails');
            return checkDriverExist(results);
        }).catch((err) => {
            console.log('fetchTaskDetails', err);
        });

}

function push_notification(taskDetails, endpointArn, flag) {
    console.log('driverendpinot arn', endpointArn);
    let payload = {
        'taskDetails': taskDetails,
        'endArn': endpointArn,
        'flage': flag
    };
    return notification.call(payload);
}

function checkDriverExist(taskData) {
    console.log('chekckDriver', JSON.stringify(taskData));
    var taskId = taskData._id;
    console.log('taskId', taskId);
    taskData = (taskData) ? taskData.toObject() : '';
    if (!_.isEmpty(taskData) && taskData.driver) {
        console.log('true');
        return UserModel.findOne({'_id': mongoose.Types.ObjectId(taskData.driver)})
            .then((driverDetails) => {
                let driverInfo = (driverDetails) ? driverDetails.toObject() : '';
                console.log("driverDetails", driverDetails);
                if (!driverInfo) {
                    return Promise.resolve();
                } else {
                    return Promise.all([push_notification(taskData, driverInfo.endpointArn, 3),
                        insertNotificationCollection(taskData), driverStatusUpdate(taskData.driver, driverInfo.driverStatus, taskId)])

                }
            });

    }
    else {
        console.log('false');
        return Promise.resolve();
    }
}


function insertNotificationCollection(taskData) {
    if (taskData._id) {
        delete taskData._id;
    }
    let newNotification = new notificationModel(taskData);
    return newNotification.save();
}


function driverStatusUpdate(driver, driverStatus, taskId) {
    console.log('taskId', taskId);
    if (driverStatus === driverConst.OFFLINE || driverStatus === driverConst.BLOCKED) {
        // if (driverStatus !== 3  driverStatus !== 4) {
        console.log('driver is in offline or blocked status');
        return Promise.resolve();
    } else {
        return taskModel.aggregate([{
            "$match": {
                "driver": mongoose.Types.ObjectId(driver),
                "taskStatus": taskConst.STARTED,
                "isDeleted": isIt.NO,
                "_id": {'$ne': mongoose.Types.ObjectId(taskId)}
            }
        }]).then((taskCount) => {
            console.log('taskDetails', taskCount);
            console.log(driver);
            (taskCount.length) ? currentDriverStatus = driverConst.IN_TRANSIT : currentDriverStatus = driverConst.IDLE;
            return UserModel.update({_id: mongoose.Types.ObjectId(driver)}, {driverStatus: currentDriverStatus}).then((change) => {
                console.log('driverStatusChange', JSON.stringify(change));
                return Promise.resolve();
            }).catch((err) => {
                console.log('driverStatusChange', err)
            });
        }).catch((err) => {
            console.log('taskCollectionForDriver', err)
        });
    }
}
