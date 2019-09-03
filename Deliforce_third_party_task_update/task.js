const mongoose = require('mongoose');
const result = require('./result');
const helper = require('./util');
const constant = require('./constant')();
const business = constant.BUSINESS_TYPE;
const taskConst = constant.TASK_STATUS;
const taskColor = constant.STATUS_COLORS;
const smsKey = constant.SMS_KEY;
const sendGridKey = constant.SENDGRID;
const model = require('./model');
const tasklogModel = model.tasklogModel;
const taskM = model.task;
const isIt = constant.isIt;
const settingModel = model.settingModel;
const webhookModel = model.webhook;
const smsLogModel = model.smsLogModel;
const userModel = model.userModel;
const teamModel = model.teamModel;
const notification = require('./notify');
const emailSms = require('./emailSms');
const _ = require('lodash');
const moment = require('moment-timezone');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(sendGridKey.API_KEY);
const empty = require('is-empty');
const AWS = require('aws-sdk');
const lambda = new AWS.Lambda();
const smsGateWayModel = model.smsGateWayModel;

const geocoder = require('geocoder');
const googleMapKey = constant.GOOGLEMAP;
const apiKey = {key: googleMapKey.GOOGLEMAP_APIKEY};
const rp = require('request-promise');
const msg91 = require('msg91')(smsKey.API_KEY, smsKey.SENDER_ID, smsKey.ROUTE_NO);
const TinyURL = require('tinyurl');
const sparrowSMS = require('sparrow-sms');

module.exports = {

    //princial  manager- clientId , role , sub , teams
    //admin - sub , role

    editTask: (event, cb, principals) => {

        const data = helper.getBodyData(event);
        if (!data) {
            result.invalidInput(cb);
        } else {
            if(!data.name) {
                result.nameRequired(cb);
            } else if(!data.phone) {
                result.phoneRequired(cb);
            }
            const taskModel = model.task.getTaskModel(data['businessType']);
            const clientId = principals.sub;
            let userData;
            let taskData;
            console.log('taskId', data.taskId);
            taskModel.findOne({taskId: data.taskId}).then((taskRes) => {
                console.log('taskRes', JSON.stringify(taskRes));
                const task_id = taskRes._id;
                data._id = task_id;
                userModel.findOne({driverId: data.driverId, clientId: clientId}).then((driveRes) => {
                    driveRes = (driveRes) ? driveRes.toObject() : driveRes;
                    if (driveRes) {
                        data.driver = driveRes._id;
                    }
                    if (driveRes && driveRes.driverStatus == 4) {
                        result.sendBlockStatus(cb);
                    } else {
                        console.log('data', JSON.stringify(data));
                        checkDriver(data, clientId)
                            .then((user) => {
                                console.log('data++', JSON.stringify(data));
                                console.log('user++', JSON.stringify(user));
                                userData = user;
                                if (userData.team) {
                                    data.team = mongoose.Types.ObjectId(userData.team);
                                } else {
                                    data.team = null;
                                }
                                return getWebHookData(clientId).then((webhookData) => {
                                    if (data.recurringObj && data.recurringObj.isRecur === true) {
                                        return getDailyRange(data).then((dateRange) => {
                                            data.isRecur = data.recurringObj.isRecur;
                                            data.dateRange = dateRange;
                                            data.dateRangeView = dateRange;
                                            return editTask(data, clientId, taskModel, webhookData, cb);
                                        })
                                    } else {
                                        return editTask(data, clientId, taskModel, webhookData, cb);
                                    }


                                 //   return editTask(data, clientId, taskModel, webhookData, cb);
                                })
                            }).then((result) => {
                            taskData = result.update;
                            console.log('taskupdate++', JSON.stringify(result.update));
                            //return createTasklog(result.old, result.update, userData, principals.role);
                            if (data.taskStatus === taskConst.SUCCESS && (data.rating || data.comment) ? (data.rating) ? data.rating : data.comment.length : false) {
                                console.log('task log on rating in not updated');
                                return Promise.resolve({'msg': 'task log and email invoketion doesnt happen for rating the driver'});
                            } else {
                                return Promise.all([createTasklog(result.old, result.update, userData, principals.role, clientId), invoke_sns_lambda(data, task_id)]);
                            }
                        }).then(() => {
                            result.sendSuccess(cb, taskData);
                        }).catch((err) => {
                            if (err.message === 'DriverNotExistInSpecifiedTeam') {
                                result.DriverNotExistInSpecifiedTeam(cb);
                            } else {
                                console.log(err);
                                result.sendServerError(cb)
                            }
                        });
                    }
                });
            });
        }
    }
};





function sendSns(taskDetails, taskId, endpointArn, flage) {
    console.log('driverendpinot arn', endpointArn);
    taskDetails._id = taskId;
    if (taskDetails.taskStatus !== taskConst.SUCCESS) {
        let AWS = require('aws-sdk');
        let lambda = new AWS.Lambda({
            region: 'ap-south-1' //change to your region
        });
        let payload = {
            'taskDetails': taskDetails,
            'endArn': endpointArn,
            'flage': flage
        };
        let params = {
            FunctionName: 'sns_push_notifications', // the lambda function we are going to invoke
            InvocationType: 'Event',
            LogType: 'Tail',
            Payload: JSON.stringify(payload),
        };
        return new Promise((reslove, reject) => {

            lambda.invoke(params, function (err, data) {
                if (err) {
                    console.log(err);
                    reslove();

                } else {
                    console.log('called sns lambda');
                    reslove();

                }
            })
        })
    } else {
        return Promise.resolve({'msg': 'successfull task isnt notified to driver'});
    }
}

function checkDriver(data, clientId) {
    return new Promise((resolve, reject) => {
        if (data.driver && data.teamId) {
            const driverObjId = data.driver;
            teamModel.findOne({teamId: data.teamId}, {_id: 1}).then((teamData) => {
                teamData = (teamData) ? teamData.toObject() : teamData;
                userModel.find({$or: [{_id: driverObjId}, {'cognitoSub': clientId}]}).then((adminDriverData) => {
                    let driverData = adminDriverData.find(obj => {
                        obj = obj.toObject();
                        return obj.role === 3;
                    });
                    driverData = (driverData) ? driverData.toObject() : '';
                    if (String(driverData.assignTeam) === String(teamData._id)) {
                        const result = {adminName: '', driverName: ''};
                        result.team = teamData._id;
                        adminDriverData.find((driver) => {
                            driver = driver.toObject();
                            console.log(driver._id);
                            let strdriver = driver._id.toString();
                            console.log(typeof strdriver);
                            console.log(typeof data.driver);
                            if (driver._id.toString() === data.driver.toString()) {
                                result.driverName = (driver.clientId === clientId) ? driver.name : '';
                            }
                            if (driver.cognitoSub === clientId) {
                                result.adminName = driver.name;
                            }
                        });

                        // check driverid is secured one
                        if (result.driverName) resolve(result);
                        else reject({message: 'invalid driver'});
                    } else {
                        reject({message: 'DriverNotExistInSpecifiedTeam'});
                    }
                })
            });
        } else if (data.driver) {
            const driverObjId = data.driver;
            userModel.find({$or: [{_id: driverObjId}, {'cognitoSub': clientId}]})
                .then((response) => {
                    const result = {adminName: '', driverName: ''};
                    response.find((driver) => {
                        driver = driver.toObject();
                        console.log(driver._id);
                        let strdriver = driver._id.toString();
                        console.log(typeof strdriver);
                        console.log(typeof data.driver);
                        if (driver._id.toString() === data.driver.toString()) {
                            result.driverName = (driver.clientId === clientId) ? driver.name : '';
                        }
                        if (driver.cognitoSub === clientId) {
                            result.adminName = driver.name;
                        }
                    });

                    // check driverid is secured one
                    if (result.driverName) resolve(result);
                    else reject({message: 'invalid driver'});

                }).catch((err) => reject(err));
        } else if (data.teamId) {
            teamModel.findOne({teamId: data.teamId}).then((teamData) => {
                teamData = (teamData) ? teamData.toObject() : teamData;
                userModel.findOne({'cognitoSub': clientId})
                    .then((response) => {
                        const data = response.toObject();
                        resolve({adminName: data.name, driverName: '', team: teamData._id});
                    }).catch((err) => reject(err));
            });
        } else {
            userModel.findOne({'cognitoSub': clientId})
                .then((response) => {
                    const data = response.toObject();
                    resolve({adminName: data.name, driverName: ''});
                }).catch((err) => reject(err));
        }
    });


}

function getWebHookData(clientId) {
    return userModel.findOne({cognitoSub: clientId, role: 1}).then((admin) => {
        admin = admin.toObject();
        return webhookModel.find({clientId: admin.cognitoSub}).then((webhookData) => {
            console.log(webhookData);
            return webhookData;
        })
    })
}

function editTask(data, clientId, taskModel, webhookData, cb) {
    return new Promise((resolve, reject) => {
        if (!taskModel) {
            reject('model not found for businessType');
        }

        data.clientId = clientId;
        if (!data.driver && (data.taskStatus !== taskConst.UNASSIGNED && data.taskStatus !== taskConst.FAIL && data.taskStatus !== taskConst.CANCELLED)) {
            result.driverMandatory(cb);
        } else {
            if (data.driver && (data.taskStatus === taskConst.DECLINED || data.taskStatus === taskConst.UNASSIGNED)) {
                data.taskStatus = taskConst.ASSIGNED;
            } else if (!data.driver && data.taskStatus === taskConst.UNASSIGNED) {
                data.driver = null;
            }
            const taskId = data._id;
            delete data._id;
            const query = {_id: mongoose.Types.ObjectId(taskId), clientId: clientId};
            taskModel.findOne(query, (err, taskFetch) => {
                if (err) {
                    reject(err);
                } else {
                    console.log('after call data', JSON.stringify(taskFetch));
                    data.taskColor = getTaskColor(data.taskStatus);
                    if (data.taskStatus === taskConst.SUCCESS) {
                        data.delay = checkDelayOrNot(taskFetch);
                    }
                    if (data.address) {
                        geoCoder(data).then((address) => {
                            console.log(JSON.stringify(address));
                            if (!address.formatted_address.length) {
                                return result.invalidAddress(cb);
                            } else {
                                data.address = {
                                    'formatted_address': address.formatted_address,
                                    'geometry': address.geometry
                                };
                                console.log('after call data', JSON.stringify(data));
                                Promise.all([compareOldDatatoNewData(taskFetch, data, taskId, taskModel), taskModel.update(query, data, {
                                    multi: false,
                                    runValidators: true
                                })])
                                    .then((taskData) => {
                                        taskModel.findOne({taskId: data.taskId}).then((taskDetails) => {
                                            let url;
                                            let triggerName;
                                            let method = 'POST';
                                            console.log('webHookArr', JSON.stringify(webhookData));
                                            for (let i = 0; i < webhookData.length; i++) {
                                                webhookData[i] = webhookData[i].toObject();
                                                if (webhookData[i].trigger === data.taskStatus) {
                                                    url = webhookData[i].url;
                                                    triggerName = webhookData[i].triggerName;
                                                }
                                            }
                                            let options = {
                                                method: method,
                                                uri: url,
                                                body: {
                                                    triggerName: triggerName,
                                                    data: taskDetails
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
                                        });
                                        data.flag = 1;
                                        attachAdminArray(data, clientId).then(() => {
                                            resolve({old: taskFetch, update: taskData});
                                        });
                                    }).catch((err) => handleError(err, cb));
                            }
                        });
                    }
                }
            });
        }

    });
}

function attachAdminArray(data, clientId) {
    console.log('dataInside', JSON.stringify(data));
    let adminArray = [];
    let driverDetails = [];
    adminArray.push(clientId);
    if (!data.driver) {
        data.driverDetails = driverDetails;
        data.adminArray = adminArray;
        console.log('adminArray', JSON.stringify(data));
        return callMqttLambda(data);
    } else {
        return userModel.find({'_id': mongoose.Types.ObjectId(data.driver)}).then((res) => {
            driverDetails.push(res[0]);
            console.log('res', JSON.stringify(res));
            res = (res[0]) ? res[0].toObject() : null;
            console.log(res.assignTeam);
            return userModel.find({'teams': mongoose.Types.ObjectId(res.assignTeam)}).then((manager) => {
                console.log('manager', JSON.stringify(manager));
                manager.forEach((ele) => {
                    console.log('ele', JSON.stringify(ele));
                    ele = (ele) ? ele.toObject() : null;
                    adminArray.push(ele.cognitoSub);
                });
                data.driverDetails = driverDetails;
                data.adminArray = adminArray;
                console.log('adminArray', JSON.stringify(data));
                return callMqttLambda(data);
            })
        })
    }
}

function callMqttLambda(data) {
    let params = {
        FunctionName: 'Deliforce_third_party_task_mqtt', // the lambda function we are going to invoke
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

function checkDelayOrNot(data) {
    let delay;
    let systemTime = new Date();
    let systemTimeISO = systemTime.toISOString();
    if (data && data.businessType === 1) {
        return delay = (new Date(data.date) <= new Date(systemTimeISO)) ? 1 : 0;
    } else {
        return delay = (new Date(data.endDate) <= new Date(systemTimeISO)) ? 1 : 0;
    }

}


function handleError(error, cb) {
    console.log('handle error', error);
    const err = error.errors;
    console.log(err);
    console.log(err.phone);
    if (!err) {
        result.sendServerError(cb);
    } else {
        if (err.email) {
            result.invalidEmail(cb);
        }
        else if (err.name) {
            result.invalidName(cb);
        }
        else if (err.phone) {
            result.invalidPhone(cb);
        }
        else if (err.address) {
            result.invalidAddress(cb);
        }
        else {
            console.log(err);
            result.invalidInput(cb);
        }
    }
}

function createTasklog(oldTask, updateTask, ud, role) {
    console.log('oldTask', oldTask);
    console.log('updateTask', updateTask);

    const models = [];
    const taskLogStatus = constant.TASK_LOG_STATUS;
    const model = {
        user: ud.adminName,
        taskStatus: taskLogStatus.UPDATED,
        taskId: oldTask._id,
        clientId: oldTask.clientId,
        role: role
    };

    models.push(model);
    if (updateTask.taskStatus && oldTask.taskStatus !== updateTask.taskStatus) {
        const model = {
            user: ud.adminName,
            taskStatus: updateTask.taskStatus,
            taskId: data._id,
            driverName: ud.driverName,
            clientId: clientId,
            role: role
        };
        models.push(model);
    }

    return tasklogModel.insertMany(models);
}


function findDriver(driverId, taskId) {
    return userModel.aggregate([{$match: {_id: mongoose.Types.ObjectId(driverId)}},
        {
            $lookup:
                {
                    from: "tasks",
                    "let": {"driver": "$_id"},
                    "pipeline": [
                        {
                            "$match": {
                                "$expr": {$eq: ["$$driver", "$driver"]},
                                "isDeleted": 0,
                                "taskStatus": 4,
                                "_id": {'$ne': mongoose.Types.ObjectId(taskId)}
                            }
                        },
                    ],
                    as: "tasks"
                }
        }])
    // return userModel.findOne({_id: mongoose.Types.ObjectId(driverId)})
}

function compareOldDatatoNewData(oldTaskData, newTaskData, taskId, taskModel) {
    let oldTaskInfo = (oldTaskData) ? oldTaskData.toObject() : '';


    //console.log('compare oldData0',JSON.stringify(oldTaskData),JSON.stringify(newTaskData));
    // 1 means add 2 means update 3 means deleted task to driver
    if (oldTaskInfo.driver && newTaskData.driver && newTaskData.driver == oldTaskInfo.driver) {
        return findDriver(newTaskData.driver, taskId).then((driverInfo) => {
            console.log('driverInfo', driverInfo);
            if (!_.isEmpty(driverInfo)) {
                driverInfo = driverInfo[0];
                (driverInfo.tasks && driverInfo.tasks.length) ? currentDriverStatus = 2 : (newTaskData.taskStatus === 4) ? currentDriverStatus = 2 : currentDriverStatus = 1;
                return compareTaskStatus(newTaskData, currentDriverStatus, driverInfo, '').then(() => {
                    return sendSns(newTaskData, taskId, driverInfo.endpointArn, 2);
                }).catch((error) => {
                    console.log(error)
                })
            }
            else {
                return Promise.resolve({'message': 'driver Data not founded'})
            }
        }).catch((error) => {
            console.log(error)
        })

    } else if (!oldTaskInfo.driver && !newTaskData.driver) {
        return Promise.resolve({'message': 'task is un assinged'});
    } else if (!oldTaskInfo.driver && newTaskData.driver) {
        //get one driver info and send sns
        return findDriver(newTaskData.driver, taskId)
            .then((driverData) => {
                if (_.isEmpty(driverData)) {
                    return Promise.resolve({'message': 'driver Data not found'})
                }
                else {
                    let driverInfo = driverData[0];
                    (driverInfo.tasks && driverInfo.tasks.length) ? currentDriverStatus = 2 : (newTaskData.taskStatus === 4) ? currentDriverStatus = 2 : currentDriverStatus = 1;
                    return compareTaskStatus(newTaskData, currentDriverStatus, driverInfo, '').then(() => {
                        return sendSns(newTaskData, taskId, driverInfo.endpointArn, 1);
                    }).catch((error) => {
                        console.log(error)
                    })
                }
            }).catch((error) => {
                console.log(error)
            })
    } else if (oldTaskInfo.driver && !newTaskData.driver) {
        return findDriver(oldTaskInfo.driver, oldTaskInfo._id)
            .then((driverData) => {
                if (_.isEmpty(driverData)) {
                    return Promise.resolve({'message': 'driver Data not found'})
                }
                else {
                    let driverInfo = driverData[0];
                    (driverInfo.tasks && driverInfo.tasks.length) ? currentDriverStatus = 2 : currentDriverStatus = 1;
                    return compareTaskStatus(oldTaskInfo, currentDriverStatus, driverInfo, 'defaultStop').then(() => {
                        return sendSns(newTaskData, taskId, driverInfo.endpointArn, 3);
                    }).catch((error) => {
                        console.log(error)
                    });
                }
            }).catch((error) => {
                console.log(error)
            })
    } else {
        //ge two driver info and send sns
        return Promise.all([findDriver(oldTaskInfo.driver, oldTaskInfo._id), findDriver(newTaskData.driver, taskId)])
            .then((resultArry) => {
                console.log('resultArry', resultArry);
                let oldDriverInfo = (resultArry.length && resultArry[0]) ? resultArry[0] : '';
                let newDriverInfo = (resultArry.length && resultArry[1]) ? resultArry[1] : '';
                let oldDriverStatus = (oldDriverInfo[0].tasks && oldDriverInfo[0].tasks.length) ? currentoldDriverStatus = 2 : currentoldDriverStatus = 1;
                let newDriverStatus = (newDriverInfo[0].tasks && newDriverInfo[0].tasks.length) ? currentnewDriverStatus = 2 : (newTaskData.taskStatus === 4) ? currentDriverStatus = 2 : currentnewDriverStatus = 1;
                if (oldDriverInfo && newDriverInfo) {
                    return Promise.all([sendSns(newTaskData, taskId, oldDriverInfo[0].endpointArn, 3), compareTaskStatus(oldTaskInfo, oldDriverStatus, oldDriverInfo[0], 'defaultStop'),
                        sendSns(newTaskData, taskId, newDriverInfo[0].endpointArn, 1), compareTaskStatus(newTaskData, newDriverStatus, newDriverInfo[0], '')])
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

}


function compareTaskStatus(task, currentDriverStatus, driver, title) {
    console.log(driver);
    console.log(driver._id);
    return userModel.update({_id: mongoose.Types.ObjectId(driver._id)}, {driverStatus: currentDriverStatus}).then((res) => {
        console.log(res);
        if (title === 'defaultStop' && currentDriverStatus === 1) {
            return sendSns(currentDriverStatus, driver.endpointArn, 'mqttStop');
        } else {
            if (task.taskStatus === taskConst.STARTED && currentDriverStatus === 1) {
                return sendSns(currentDriverStatus, driver.endpointArn, 'mqttPub');
            } else if ((task.taskStatus === taskConst.SUCCESS || task.taskStatus === taskConst.FAIL || task.taskStatus === taskConst.CANCELLED || task.taskStatus === taskConst.DECLINED) && currentDriverStatus === 1) {
                return sendSns(currentDriverStatus, driver.endpointArn, 'mttStop');
            }
        }
    });
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

function getCompanyDriver(data) {
    let promisArray = [userModel.findOne({'cognitoSub': data.clientId}),
        smsGateWayModel.findOne({'clientId': data.clientId})];
    return Promise.all(promisArray);
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


function getTaskColor(status) {
    if (status === taskConst.UNASSIGNED) {
        return taskColor.UNASSIGNED;
    } else if (status === taskConst.ASSIGNED) {
        return taskColor.ASSIGNED;
    } else if (status === taskConst.ACCEPTED) {
        return taskColor.ACCEPTED;
    } else if (status === taskConst.STARTED) {
        return taskColor.STARTED;
    } else if (status === taskConst.INPROGRESS) {
        return taskColor.INPROGRESS;
    } else if (status === taskConst.SUCCESS) {
        return taskColor.SUCCESS;
    } else if (status === taskConst.FAIL) {
        return taskColor.FAIL;
    } else if (status === taskConst.DECLINED) {
        return taskColor.DECLINED;
    } else if (status === taskConst.CANCELL) {
        return taskColor.CANCELL;
    } else if (status === taskConst.ACKNOWLEDGE) {
        return taskColor.ACKNOWLEDGE;
    } else {
        return null;
    }
}

function invoke_sns_lambda(data, id) {
    console.log(data);
    if (data.taskStatus === taskConst.STARTED || data.taskStatus === taskConst.SUCCESS || data.taskStatus === taskConst.FAIL) {
        return trackingLink(data._id).then((trackingLink) => {
            return ratingLink(data._id).then((ratingLink) => {
                return getCompanyDriver(data).then((result) => {
                    const adminDetails = (result[0]) ? result[0].toObject() : null;
                    const smsGateWayData = (result[1]) ? result[1].toObject() : null;
                    const payload = {
                        _id: data._id,
                        pickUp: getBussinessType(data),
                        clientId: data.clientId,
                        buisnessType: data.buisnessType,
                        trigger: getTaskStatus(data.taskStatus),
                        number: data.phone,
                        email: data.email,
                        taskId: id,
                        TrackingLink: trackingLink,
                        RatingLink: ratingLink,
                        CustomerName: data.name,
                        StartDate: moment(data.date).format("DD-MM-YYYY"),
                        StartTime: moment(data.date).tz(data.timezone).format("hh:mm:A"),
                        EndDate: moment(data.endDate).format("DD-MM-YYYY"),
                        EndTime: moment(data.endDate).tz(data.timezone).format("hh:mm:A"),
                        CompletedTime: moment(data.endDate).format("hh:mm:A"),
                        AgentName: (data.driverDetails) ? data.driverDetails.name : '',
                        OrderId: data.orderId,
                        CustomerAddress: data.address.formatted_address,
                        CompanyName: (adminDetails && adminDetails.companyName) ? adminDetails.companyName : '',
                        smsGateWayData: smsGateWayData,
                        smsPlan: adminDetails.smsPlan


                    };
                    console.log('invoke_sns', JSON.stringify(payload));
                    //return emailSms.call(payload);

                    return getNotifications(payload).then((notification) => {
                        // console.log('After getting Notification : ',JSON.stringify(notification.notifications));
                        console.log('After getting Notification : ', JSON.stringify(notification.notifications[payload.trigger]));
                        const notify = notification.notifications[payload.trigger];
                        //console.log('Notitfy : ' ,notify);
                        if (notify['sms'] === true && notify['email'] === true) {
                            smsTemp = getTemplate(notify['smsTemp'], payload);
                            mailTemp = getTemplate(notify['mailTemp'], payload);
                            console.log('Mail Temp : ', mailTemp);
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
                }).catch((err) => {
                    console.log(err)
                });
            }).catch((err) => {
                console.log(err);
            });
        }).catch((err) => {
            console.log(err);
        });

    } else {
        return Promise.resolve({'message': 'task status doesnt need mailSms trigger'});
    }
}


function getDailyRange(taskDetails) {

    return new Promise((resolve, reject) => {

        // {"date":"2019-05-07T10:20:01.294Z","endDate":"2019-05-07T11:20:01.294Z",
        //     "images":[],"driverImageOption":{"exist":false,"isMandatory":false},
        //     "isPickup":false,"name":"reoccur","phone":"+91 8547854485","email":"",
        //     "address":{"formatted_address":"Marathahalli, Bengaluru, Karnataka, India",
        //     "geometry":{"location":{"lat":12.956924,"lng":77.70112700000004},
        //     "viewport":{"south":12.9418921,"west":77.67846600000007,"north":12.9735348,
        //         "east":77.70954069999993}}},"driver":"5c6e4cc9784a6f400701e850",
        //     "color":"#F5DB09","timezone":"Asia/Calcutta","businessType":3,
        //     "manual":true,"recurringObj":{"isRecur":true,"isRecurType":1,
        //     "isRecurDaysOn":[],"recurEndsOn":"2019-05-10T18:30:00.000Z","recurEndsAfter":null}}
        const Moment = require('moment');
        const MomentRange = require('moment-range');
        const moment = MomentRange.extendMoment(Moment);
        //const start = new Date('2019-04-25T05:49:59Z');
        // const end = new Date('2019-04-29T05:49:59Z');
        const start = new Date(taskDetails.date);

        if (taskDetails.recurringObj.recurEndsOn && taskDetails.recurringObj.recurEndsOn !== null) {
            var end = new Date(taskDetails.recurringObj.recurEndsOn);
        }
        if (taskDetails.recurringObj.recurEndsAfter && taskDetails.recurringObj.recurEndsAfter !== null) {
            var result = new Date(taskDetails.date);
            result.setDate(result.getDate() + taskDetails.recurringObj.recurEndsAfter);
            var end = result.toISOString();
            console.log('end date' + end);
        }
        const range = moment.range(moment(start), moment(end));
        var type = taskDetails.recurringObj.isRecurType;
        if (type === 1) {
            console.log('coming here')// daily
            resolve(diffType('day', range));
        }
        else if (type === 2) {   // weekly
            var a = moment(taskDetails.date);
            if (taskDetails.recurringObj.recurEndsOn && taskDetails.recurringObj.recurEndsOn !== null) {
                var recurEndsOn = taskDetails.recurringObj.recurEndsOn
                var b = moment(recurEndsOn);
            }
            else {
                var occurences = taskDetails.recurringObj.recurEndsAfter * 7;  // occurence week
                var b = moment(a).add('days', occurences);

            }
            console.log(b);
            //
            var difference = b.diff(a, 'days');
            console.log(difference + 'difference here');
            var findRangeArray = [];
            var isRecurDaysOn = taskDetails.recurringObj.isRecurDaysOn;
            for (var i = 0; i < isRecurDaysOn.length; i++) {
                if (isRecurDaysOn[i].checked === true) {
                    findRangeArray.push(isRecurDaysOn[i].number);
                }
            }
            var total = [];
            var temp = [];
            for (var i = 0; i < findRangeArray.length; i++) {
                total = total.concat(weeklyReturn(findRangeArray[i], a, difference));
            }
            resolve(total);
        }
        else if (type === 3) {   // monthly
            resolve(diffType('month', range));
        }
        else {                                    // yearly
            resolve(diffType('year', range));
        }
    }).catch((err) => {
        console.log(err + 'consoling error here');
    })
}

function diffType(type, range) {
    let arr = Array.from(range.by(type));
    let dateRange = arr.map(m => m.toISOString())
    dateRange.shift();
    return dateRange;
}

function weeklyReturn(day, a, difference) {
    let start = a;
    let end = moment().add(difference - 1, 'd');

    console.log(end.toISOString() + 'end');
    var arr = [];
// Get "next" monday
    let tmp = start.clone().day(day);
    console.log(tmp.toISOString() + 'tmp');
    if (tmp.isAfter(start, 'd')) {
        arr.push(tmp.toISOString());
    }
    while (tmp.isBefore(end)) {
        tmp.add(7, 'days');
        arr.push(tmp.toISOString());
    }
    var lastItem = arr.pop();
    console.log(lastItem);
    if (moment(lastItem).isAfter(end)) {
        return arr
    }
    else {
        arr.push(lastItem);
        return arr;
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
    if (data.smsPlan !== 1) {
        return new Promise((resolve, reject) => {
            let gateWay;
            if (data.smsPlan === 3 && data.smsGateWayData) { // personal sms service
                gateWay = data.smsGateWayData.gateway;
            } else if (data.smsPlan === 2) { // Deliforce sms service
                gateWay = null;
            } else {
                return resolve();
            }

            switch (gateWay) {
                case 1:
                    resolve(callTwilio(data, smsTemp));
                    break;

                case 2:
                    resolve(callMsg91(data, smsTemp));
                    break;

                case 3:
                    resolve(callSparrow(data, smsTemp));
                    break;

                default:
                    resolve(callDefaultTwilio(data, smsTemp));
                    break;
            }
        })
    }
}

function callTwilio(data, sms) {
    console.log('presonal twilio sms service', JSON.stringify(data.smsGateWayData));

    const client = require('twilio')(data.smsGateWayData.accountSid, data.smsGateWayData.authToken);

    return client.messages.create({
        from: data.smsGateWayData.phone,
        to: data.number.replace(' ', ''),
        body: sms
    }).then((message) => {
        console.log(message.sid)
    });
}

function callMsg91(data, sms) {
    console.log('personal msg91 sms service', JSON.stringify(data.smsGateWayData));

    const msg91 = require('msg91')(constant.SMS_KEY.API_KEY, constant.SMS_KEY.SENDER_ID, constant.SMS_KEY.ROUTE_NO);

    return new Promise((resolve, reject) => {
        const mobileNo = getmobileNo(data);
        console.log(mobileNo);

        msg91.send(mobileNo, sms, function (err, response) {
            if (err) {
                console.log('error');
                console.log(err);
                return resolve({'message': 'error in sending sms'})
            }
            else {
                console.log('success');
                console.log(response);
                return resolve({'message': 'sending sms is sucessful'});
            }

        });
    });
}

function callSparrow(data, smsData) {
    console.log('personal sparrow sms service', JSON.stringify(data.smsGateWayData));

    let authObject = {
        token: data.smsGateWayData.token,
        identity: data.smsGateWayData.identity
    };

    function sms(authObject) {
        return new Promise((resolve, reject) => {
            resolve(sparrowSMS.setAuth(authObject));
        });
    }

    return sms(authObject).then(() => {
        let phone = data.number.split(' ');
        sparrowSMS.sendSMS({
            text: smsData,
            recipients: phone[1]
        })
    })
}

function callDefaultTwilio(data, sms) {
    console.log('deliforce sms service', JSON.stringify(data.smsGateWayData));

    const accountSid = constant.TWILIO.ACCOUNT_SID;
    const authToken = constant.TWILIO.AUTH_TOKEN;
    const defaultPhone = constant.TWILIO.PHONE;

    const client = require('twilio')(accountSid, authToken);

    return new Promise((resolve, reject) => {
        client.messages.create({
            from: defaultPhone,
            to: data.number.replace(' ', ''),
            body: sms
        }).then((message) => {
            console.log('message.sid', message.sid);
            return client.messages(message.sid)
                .fetch()
                .then((messageData) => {
                    console.log('messageData', JSON.stringify(messageData));
                    let smsLogData = {};
                    let promise = new Promise(resolve => {
                        smsLogData.messageSid = messageData.sid;
                        smsLogData.from = messageData.from;
                        smsLogData.to = messageData.to;
                        smsLogData.content = messageData.body;
                        smsLogData.contentSegments = messageData.numSegments;
                        smsLogData.price = Math.abs(messageData.price);
                        smsLogData.priceUnit = messageData.priceUnit;
                        smsLogData.clientId = data.clientId;
                        smsLogData.status = messageData.status;
                        smsLogData.dateSent = new Date(messageData.dateSent);
                        resolve(smsLogData);
                    });
                    return promise.then(smsLogData => {
                        return new smsLogModel(smsLogData).save().then((res) => {
                            console.log('smsLogData', smsLogData);
                            return resolve(res);
                        }).catch((err) => {
                            console.log('err', err);
                        })
                    });
                }).catch((err) => {
                    console.log('err storing smsLog', err);
                })
        }).catch((err) => {
            return resolve(console.log('error sending message', err));
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
    const phone = data.number.substr(data.number.indexOf('+') + 1);
    let finalPhone = phone.replace(' ', '');
    let countryCode = '0';
    var mobileNo = countryCode + finalPhone;
    console.log(mobileNo, 'mobileNo');
    return mobileNo;
}


function getNotifications(data) {
    return settingModel.findOne({clientId: data.clientId, isCurrent: true}, {notifications: 1})
}

function trackingLink(id) {
    let link = constant.LINK.TRACKING;
    let url = link + id;
    return new Promise((resolve, reject) => {
        TinyURL.shorten(url, function (res) {
            return resolve(res);
        })
    })
}

function ratingLink(id) {
    let link = constant.LINK.RATING;
    let url = link + id;
    return new Promise((resolve, reject) => {
        TinyURL.shorten(url, function (res) {
            return resolve(res);
        })
    })
}

function getTemplate(template, data) {
    let content = {};
    let regX = /USER_NAME|CustomerName|CustomerAddress|AgentName|EndTime|EndDate|OrderId|StartDate|StartTime|TrackingLink|RatingLink|CompanyName|CompletedTime|pickUp|taskId/gi;
    let emailContent = template.replace(/[\[\]']+/g, ''); // first remove the [] ;
    content = emailContent.replace(regX, function (matched) {
        return data[matched];
    });
    return content;
}

function geoCoder(data) {
    return new Promise((resolve, reject) => {
        console.log('gocode', data);
        console.log('gocode', data.latitude);
        if (data.latitude && data.longitude) {
            return resolve({
                'formatted_address': data.address,
                'geometry': {"location": {"lat": Number(data.latitude), "lng": Number(data.longitude)}}
            });
        } else {
            geocoder.geocode(data.address, (err, address) => {
                if (err || !address.results.length) {
                    return reject({message: 'address is invalid'});
                } else {
                    return resolve({
                        'formatted_address': data.address,
                        'geometry': address.results[0].geometry
                    });
                }
            }, apiKey);
        }
    });
}
