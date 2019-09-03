const mongoose = require('mongoose');
const result = require('./result');
const helper = require('./util');
const constant = require('./constant')();
const model = require('./model');
const taskConst = constant.TASK_STATUS;
const driverConst = constant.DRIVER_STATUS;
const taskColor = constant.STATUS_COLORS;
const customerModel = model.customerModel;
const tasklogModel = model.tasklogModel;
const settingModel = model.settingModel;
const smsLogModel = model.smsLogModel;
const userModel = model.userModel;
const teamModel = model.teamModel;
const notification = require('./notify');
const emailSms = require('./emailSms');
const userPlansModel = require('./model').userPlansModel;
const moment = require('moment-timezone');
const AWS = require('aws-sdk');
const business = constant.BUSINESS_TYPE;
const smsKey = constant.SMS_KEY;
const sendGridKey = constant.SENDGRID;
const googleMapKey = constant.GOOGLEMAP;
const driverModel = require('./model').DRIVER;
const smsGateWayModel = model.smsGateWayModel;
const _ = require('lodash');
var securePin = require("secure-pin");
const geocoder = require('geocoder');
const apiKey = {key: googleMapKey.GOOGLEMAP_APIKEY};
const templateModel = require('./model').templateModel;

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(sendGridKey.API_KEY);
const lambda = new AWS.Lambda();
const sparrowSMS = require('sparrow-sms');

const msg91 = require('msg91')(smsKey.API_KEY, smsKey.SENDER_ID, smsKey.ROUTE_NO);

var plansData;
var cb;
//var contextId = null;
module.exports = {


    //princial  manager- clientId , role , sub , teams
    //admin - sub , role

    saveTask: (event, cb, principals, plans) => {
        cb = cb;
        const data = helper.getBodyData(event);
        console.log(data.templateData + 'hello data');
        if (!data) {
            result.invalidInput(cb);
        } else {
            if (!validateTaskDate(data, cb)) {
                return;
            }
            const clientId = principals['sub'];
            console.log(clientId);
            console.log('after checkDriver +++++++++++++++++++++');
            return checkDriver(data, clientId)
                .then((user) => {
                    console.log('after checkDriver +++++++++++++++++++++');
                    console.log('user++', JSON.stringify(user) + 'line 56');
                    return createTask(data, clientId, cb, principals, user, plans, event);
                }).catch((err) => {
                    console.log(err);
                    if (err.message === 'invalid driver') {
                        result.invalidDriver(cb);
                    } else if (err.message === 'blocked driver') {
                        result.blockedDriver(cb);
                    } else if (err.message === 'DriverNotExistInSpecifiedTeam') {
                        result.DriverNotExistInSpecifiedTeam(cb);
                    } else {
                        result.sendServerError(cb)
                    }
                });
        }
    }
}

function validateTaskDate(data, cb) {
    const business = constant.BUSINESS_TYPE;

    if (checkCurrentDate(data.date)) {

        if (data.businessType === business.PICKUP) {
            return true;
        } else if (data.businessType === business.APPOINTMENT || data.businessType === business.FIELD) {
            return compareStartEnd(data.date, data.endDate);
        } else {
            result.businessMissing(cb);
            return false;
        }
    }

    function compareStartEnd(start, end) {
        const momentStart = moment(start);
        const momentEnd = moment(end);

        if (momentEnd.isAfter(momentStart)) {
            return true
        } else {
            result.endLesserThanStart(cb);
        }
    }


    function checkCurrentDate(date) {
        const momentDate = moment(date);
        const momentCurrent = moment().subtract(10, 'minute');

        if (!momentDate.isValid()) {
            result.invalidDate(cb);
        } else {
            if (momentDate.isSameOrAfter(momentCurrent)) {
                return true
            } else {
                result.lesserThanCurrentDate(cb);
            }
        }
    }

}


function createCustomerAndTaskLog(taskData, cb, clientId, principals, userData, plans) {
    //console.log('task++', JSON.stringify(taskData));
    taskData = (taskData) ? taskData.toObject() : taskData;

    console.log('taskLog');
    const promises = [
        createCustomer(taskData, clientId),
        push_notification(taskData, userData.endpointArn, 1),
        invoke_sns_lambda(taskData),
        createTasklog(taskData, userData, clientId, principals.role),
        increaseUserPlansTaskCount(clientId, cb, plans)
    ];
    return Promise.all(promises)

}

function checkDriver(data, clientId) {
    return new Promise((resolve, reject) => {
        console.log(JSON.stringify(data) + "line number 130");
        if (data.driverId && data.teamId) {
            console.log('driverId', data.driverId);
            console.log('teamId', data.teamId);
            teamModel.findOne({teamId: data.teamId}, {_id: 1}).then((teamData) => {
                teamData = teamData.toObject();
                userModel.find({$or: [{driverId: data.driverId}, {'cognitoSub': clientId}]}).then((adminDriverData) => {
                    let driverData = adminDriverData.find(obj => {
                        obj = obj.toObject();
                        return obj.role === 3;
                    });
                    driverData = (driverData) ? driverData.toObject() : '';
                    console.log(driverData.assignTeam);
                    console.log(teamData._id);
                    if (String(driverData.assignTeam) === String(teamData._id)) {
                        const result = {adminName: '', driverName: '', endpointArn: ''};
                        result.team = teamData._id;
                        adminDriverData.find((driver) => {
                            console.log(JSON.stringify(driver) + 'consoling driver obj')
                            driver = driver.toObject();
                            result.endpointArn = driver.endpointArn;// this  to required send push notification
                            if (driver.driverId === data.driverId) {
                                console.log('coming 1')
                                result.driver = driver._id;
                                result.driverName = (driver.clientId === clientId) ? (driver.driverStatus == driverConst.BLOCKED) ? reject({message: 'blocked driver'}) : driver.name : '';
                            }
                            if (driver.cognitoSub === clientId) {
                                console.log('coming 2')
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
        } else if (data.driverId) {
            console.log(data.driverId + 'hi driver here');
            // const driverObjId = mongoose.Types.ObjectId(data.driver);
            userModel.find({$or: [{driverId: data.driverId}, {'cognitoSub': clientId}]})
                .then((response) => {
                    console.log(JSON.stringify(response) + 'consoling driver response')
                    const result = {adminName: '', driverName: '', endpointArn: ''};
                    response.find((driver) => {
                        console.log(JSON.stringify(driver) + 'consoling driver obj')
                        driver = driver.toObject();
                        result.endpointArn = driver.endpointArn;// this  to required send push notification
                        if (driver.driverId === data.driverId) {
                            console.log('coming 1')
                            result.driver = driver._id;
                            result.driverName = (driver.clientId === clientId) ? (driver.driverStatus == driverConst.BLOCKED) ? reject({message: 'blocked driver'}) : driver.name : '';
                        }
                        if (driver.cognitoSub === clientId) {
                            console.log('coming 2')
                            result.adminName = driver.name;
                        }
                    });

                    // check driverid is secured one
                    if (result.driverName) resolve(result);
                    else reject({message: 'invalid driver'});

                }).catch((err) => reject(err));
        } else if (data.teamId) {
            teamModel.findOne({teamId: data.teamId}, {_id: 1}).then((teamData) => {
                teamData = teamData.toObject();
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

// function checkPackage(clientId){
//    userPlansModel.findOne({clientId:clientId}).then((package)=>{
//
//      var plansData = package;
//
//     //TODO const file we need to add userplans
//     if((plansData.packageType===2)||
//       (plansData.packageType===1 && plansData.taskCount<plansData.taskLimit)) {
//       console.log('successs');
//        return  Promise.resolve(planData);
//        console.log('after success');
//     }
//       else{
//         //result.PackageLimt(cb)
//       return Promise.reject({message:'you crossed your Limits'});
//       }
//
//
//   }).catch((err)=>result.PackageLimt(cb));
// }

function createTask(data, clientId, cb, principals, userData, plans, event) {
    console.log('aaevent', JSON.stringify(event));
    console.log(event.headers.apiKey);
    const taskModel = model.task;
    if (!taskModel) {
        return Promise.reject('model not found for businessType');
    }
    let loc = {type: "Point", coordinates: [0, 0]};
    var taskStatus = (data.driverId) ? taskConst.ASSIGNED : taskConst.UNASSIGNED;
    data.userRole = principals.role;
    data.user = principals.sub;
    data.clientId = clientId;
    data.taskStatus = taskStatus;
    data.taskId = securePin.generatePinSync(8);
    data.taskColor = getTaskColor(taskStatus);
    data.startLocation = loc;
    data.driver = userData.driver;
    if (userData.team) {
        data.team = userData.team;
    }
    data.isThirdParty = 1;
    data.channelApiKey = event.headers.apiKey;
        if (data.templateId && data.templateId !== null) {
            templateModel.find({templateName: data.templateId, clientId: clientId}).then((templateData) => {
                     console.log(templateData);
                     if(templateData.length) {
                         templateData = templateData[0].toObject();
                         data.templates = templateData.templates;
                     } else {
                      result.sendCustomFieldError(cb
                     }
            })
        }
    attachSettings(clientId)
        .then((settingData) => {
            data.settings = (settingData) ? settingData.toObject() : {};
            console.log('settings+++++', data.settings, settingData);
            console.log('taskData0', JSON.stringify(data));
            data.driverImages = [];
            data.driverSignature = '';
            console.log(data.address);
            if (data.address) {
                data.address = (data.address.length) ? data.address : data.address.formatted_address;
                geoCoder(data).then((address) => {
                    console.log(JSON.stringify(address));
                    if (!address.formatted_address) {
                        return result.invalidAddress(cb);
                    } else {
                        data.address = {
                            'formatted_address': address.formatted_address,
                            'geometry': address.geometry
                        };
                        console.log('after geocode', JSON.stringify(data, undefined, 2));
                        if (!data.driver && (data.manual === false)) {
                            let radius = 0;
                            if (data.settings.autoAllocation.nearest.current === true) {
                                radius = data.settings.autoAllocation.nearest.radius;
                            } else if (data.settings.autoAllocation.sendToAll.current === true) {
                                radius = data.settings.autoAllocation.sendToAll.radius;
                            } else if (data.settings.autoAllocation.oneByOne.current === true) {
                                radius = data.settings.autoAllocation.oneByOne.radius;
                            }
                            console.log('radius', radius);
                            return getNearByDrivers(radius, Number(data.address.geometry.location.lat), Number(data.address.geometry.location.lng), clientId)
                                .then((nearDriverData) => {
                                    return new taskModel(data).save().then((task) => {
                                        return attachAdminArray(task, clientId).then(() => {
                                            callBackRoundJobLambda(nearDriverData, task._id, task.settings.autoAllocation)
                                            return createCustomerAndTaskLog(task, cb, clientId, principals, userData, plans)
                                                .then((res) => {
                                                    result.sendSuccess(cb, task);
                                                })
                                        });
                                    }).catch((err) => handleError(err, cb));
                                })

                        } else {
                            console.log(JSON.stringify(data) + 'data save')
                            return new taskModel(data).save().then((task) => {
                                console.log('task', JSON.stringify(task));
                                return attachAdminArray(task, clientId).then(() => {
                                    return createCustomerAndTaskLog(task, cb, clientId, principals, userData, plans)
                                        .then((res) => {
                                            result.sendSuccess(cb, task);
                                        })
                                });
                            }).catch((err) => handleError(err, cb));
                        }
                    }
                });
            } else {
                result.addressRequired(cb);
            }
        }).catch((error) => {
        console.log(error);
        result.sendServerError(cb)
    }).catch((error) => {
        console.log(error);
        result.sendServerError(cb)
    });
}

// function attachTemplate(data, clientId) {
//     return new Promise((resolve, reject) => {
//         if (data.templateName) {
//             return templateModel.find({
//                 clientId: clientId,
//                 isDeleted: 0,
//                 templateName: data.templateName
//             }).then((templateData) => {
//                 console.log('templateData', JSON.stringify(templateData));
//                 templateData = templateData[0]._doc.templates;
//                 console.log('temp', JSON.stringify(templateData));
//                 templateData.forEach((item) => {
//                     if (item.dataType === "dropdown") {
//                         let options = [{value: 'Select'}];
//                         let fieldValueCount = item.fieldValue.split(',');
//                         for (let i = 0; i < fieldValueCount.length; i++) {
//                             options.push({value: fieldValueCount[i]});
//                         }
//                         item.fieldValue = "Select";
//                         item.options = options;
//                         console.log('item', JSON.stringify(item));
//                     }
//                 });
//                 data.templates = templateData;
//                 resolve(data);
//             })
//         } else {
//             resolve(data);
//         }
//     });
// }


// function sortTemplate(templates, fetchedTemplates) {
//     return new Promise((resolve, reject) => {
//         const resultTemplates = templates.map((x) => {
//             x.permitAgent = 'Read and Write';
//             x.mandatoryFields = 'Not-Mandatory';
//             return x;
//         });
//
//         var drpCount = _.filter(resultTemplates, {dataType: 'dropdown'});
//         var removed = _.filter(templates, item => item.dataType !== 'dropdown');
//         var options = [{value: 'Select'}];
//         for (let i = 0; i < fetchedTemplates.length; i++) {
//             var resp = fetchedTemplates[i].fieldValue.split(',');
//             for (let j = 0; j < resp.length; j++) {
//                 fetchedTemplates[i].fieldValue = '';
//                 options.push({value: resp[j]});
//                 fetchedTemplates[i].options = options;
//             }
//             options = [{value: 'Select'}];
//         }
//
//         for (var i = 0; i < fetchedTemplates.length; i++) {
//             var index = _.findIndex(fetchedTemplates, {fieldName: drpCount[i].fieldName})
//             fetchedTemplates[index].fieldValue = drpCount[i].fieldValue;
//         }
//
//         var final = removed.concat(fetchedTemplates);
//         resolve(final);
//     }).catch((err) => console.log(err));
// }

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


function callBackRoundJobLambda(driverArry, taskId, autoAllocation) {
    console.log('driverArry', JSON.stringify(driverArry));
    console.log('taskId', taskId);
    console.log('autoAll', autoAllocation);
    if (driverArry.length) {
        console.log('backgroundJob');
        let driverData = driverArry.map((driver) => {

            driver = driver.toObject();
            console.log('d.endpointArn', driver.endpointArn);
            return {'endArn': driver.endpointArn, 'driverId': driver._id}
        });


        let aws = require('aws-sdk');
        let lambda = new aws.Lambda({
            region: 'ap-south-1' //change to your region
        });

        let params = {
            FunctionName: 'Deliforce_third_party_task_autoAllocation', // the lambda function we are going to invoke
            InvokeArgs: JSON.stringify({driverData: driverData, taskId: taskId, autoAllocation: autoAllocation}),

        };


        lambda.invokeAsync(params, function (err, data) {
            if (err) {
                console.log(err, err.stack)
            }
            else {
                console.log(data)
            }
            ;
        });


    } else {
        return;
    }

}

function attachSettings(clientId) {
    return settingModel.findOne({clientId: clientId, isCurrent: true})
}

function getNearByDrivers(radius, lat, lng, clientId, cb) {
    let cords = [lng, lat];
    console.log(cords, clientId, "auto assign function");
    let radiusInMeter = radius * 1000;
    return userModel.find({
        location:
            {
                $nearSphere:
                    {
                        $geometry:
                            {
                                type: 'Point',
                                coordinates: cords
                            },
                        $minDistance: 0.0001, // minimum distance
                        $maxDistance: radiusInMeter
                    }
            },
        driverStatus: 1,
        isDeleted: 0,
        clientId: clientId,
        endpointArn: {$exists: true}
    })
}

function increaseUserPlansTaskCount(clientId, cb, plans) {
    const finalCount = plans.taskCount + 1;
    return userPlansModel.update({clientId: clientId}, {taskCount: finalCount}).then((res) => {
        console.log(res);
        return Promise.resolve();
    }).catch((err) => {
        result.sendServerError(cb);
    })
}

function handleError(error, cb) {
    console.log(error);
    const err = error.errors;
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

function createTasklog(data, ud, clientId, role) {
    const models = [];
    const taskLogStatus = constant.TASK_LOG_STATUS;
    const model = {
        user: ud.adminName,
        taskStatus: taskLogStatus.CREATED,
        taskId: data._id,
        clientId: clientId,
        role: role
    };


    models.push(model);
    if (ud.driverName) {
        const model = {
            user: ud.adminName,
            taskStatus: taskLogStatus.ASSIGNED,
            taskId: data._id,
            driverName: ud.driverName,
            clientId: clientId,
            role: role
        };
        models.push(model);
    }
    return tasklogModel.insertMany(models);
}


function push_notification(taskDetails, endpointArn, flag) {
    let payload = {
        'taskDetails': taskDetails,
        'endArn': endpointArn,
        'flage': flag
    };
    return notification.call(payload);
}


function invoke_sns_lambda(data) {
    return getCompanyDriver(data).then((result) => {
        const adminDetails = (result[0]) ? result[0].toObject() : null;
        const smsGateWayData = (result[1]) ? result[1].toObject() : null;
        const driverDetails = (result[2]) ? result[2].toObject() : null;

        const payload = {
            pickUp: 'appoinment',
            clientId: data.clientId,
            buisnessType: data.buisnessType,
            trigger: "Received",
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
            CompanyName: (adminDetails && adminDetails.companyName) ? adminDetails.companyName : '',
            smsGateWayData: smsGateWayData,
            smsPlan: adminDetails.smsPlan
            //lastRequestId: contextId
        };
        console.log('invoke_sns', JSON.stringify(payload));
        // return emailSms.call(payload);
        //send(payload);
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
                return sendSMS(payload, smsTemp)
            } else if (notify['email'] === true) {
                mailTemp = getTemplate(notify['mailTemp'], payload);
                //console.log('Mail Temp 1: ' ,mailTemp);
                return sendEmail(payload, mailTemp)

            }
        }).catch((err) => {
            console.log('err++++ ', err);
            return Promise.resolve({'msg': 'failed'})

        });
    })
};

//non-blockingIo  consol.log,assing,for()
//BlockingIo dbcalls 3rd calls
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
    let promisArry = [userModel.findOne({'cognitoSub': data.clientId})];
    promisArry.push(smsGateWayModel.findOne({'clientId': data.clientId}));
    if (data.driver) {
        promisArry.push(userModel.findOne({'_id': mongoose.Types.ObjectId(data.driver)}))
    }
    return Promise.all(promisArry)
}

function createCustomer(data, clientId) {
    const customer = {};
    customer.clientId = clientId;
    customer.name = data.name;
    customer.email = data.email;
    customer.phone = data.phone;
    customer.address = data.address;
    customer.color = data.color;
    customer.customerId = securePin.generatePinSync(8);

    console.log(customer, 'testing+++++++++++++');

    // checking if customer is exist or not if exist means we will update the customer details
    //if customer is not exist means we inserted new customer
    return customerModel.findOne({phone: data.phone})
        .then((cus) => {
            if (!_.isEmpty(cus)) {
                cus = cus.toObject();
                return customerModel.update({_id: mongoose.Types.ObjectId(cus._id)}, customer);
            } else {
                const newCustomer = new customerModel(customer);
                return newCustomer.save()
            }
        })

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
        });
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

    const msg91 = require('msg91')(data.smsGateWayData.apiKey, data.smsGateWayData.senderId, data.smsGateWayData.routeNo);

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
        subject: 'Task Notification-' + data.taskId,
        html: emailTemp
    };
    return params;
}

function getmobileNo(event) {
    console.log('getmobileNoevent', JSON.stringify(event));
    const phone = event.number.substr(event.number.indexOf('+') + 1);
    let finalPhone = phone.replace(' ', '');
    let countryCode = '0';
    let mobileNo = countryCode + finalPhone;
    console.log(mobileNo, 'mobileNo');
    return mobileNo;
}


function getNotifications(data) {
    console.log('getNotificationsData', JSON.stringify(data));
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

function googleEventTask(data) {
   var taskdetails = JSON.parse(data);
}

