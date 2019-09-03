const mongoose = require('mongoose');
const result = require('./result');
const helper = require('./util');
const driverModel = require('./model').DRIVER;
const smsGateWayModel = require('./model').smsGateWay;
const teamModel = require('./model').TEAM;
const cognito = require('./cognito');
const constant = require('./constant')();
const notify = require('./notify');
const isIt = constant.isIt;

module.exports = {

    checkDuplicate: (event, cb, principals) => {
        const data = helper.getBodyData(event);
        console.log('coming heree');
        if (!data) {
            console.log('coming heree');
            result.invalidInput(cb);
        } else {
            const clientId = principals['sub'];
            //{$or: [{'email': data.email}, {'phone': data.phone},{ _id: { $ne: mongoose.Types.ObjectId(data._id) }}]}
            console.log(data._id);
            driverModel.findOne({
                $or: [{email: data.email}, {phone: data.phone}],
                driverId: {$ne: data.driverId},
                isDeleted: isIt.NO
            }, (err, driver) => {
                console.log('driver', driver);
                if (err) {
                    console.log(err + 'err heree');
                    result.sendServerError(cb);
                } else if (driver) {
                    console.log(driver + 'driver hereeee');
                    if (driver.email === data.email && driver.phone === data.phone) {
                        result.sendDuplicateEmailPhone(cb);
                    } else if (driver.email === data.email) {
                        console.log('duplicate key of email');
                        result.sendDuplicateEmail(cb);
                    } else {
                        console.log('duplicate key of phone');
                        result.sendDuplicatePhone(cb);
                    }
                } else {
                    console.log('update driver', JSON.stringify(data));
                     console.log(data.assignTeam + 'assignTeamsssssssssssssssssssssssss');
                    teamModel.findOne({teamId: data.assignTeam}).then((teamData) => {
                        teamData = teamData ? teamData.toObject() : teamData;
                        data.assignTeam = null;
                        data.assignTeam = teamData._id;
                        data.userRole = 1;
                        data.user = clientId;
                        data.cognitoSub = clientId;
                        data.clientId = clientId; //cognito sub of admin
                        validateDriverData(data, clientId, cb, principals);
                    })
                }
            });
        }
    }
};

//before create cognito user do validate
function validateDriverData(data, clientId, cb, principals) {
    driverModel.findOne({driverId: data.driverId, isDeleted : isIt.NO}).then((res) => {
        console.log(JSON.stringify(res));
        const driverId = res._id;
        const driverData = new driverModel(data);

        driverData.validate((err) => {
            if (err) {
                console.log('coming here');
                handlerError(err, cb);
            } else {
                cognitoDriver(data, cb, clientId, driverId, principals);
            }
        })
    });
}


function findCognitoDiff(a, b) {
    const result = {};
    if (a['email'] !== b['email']) {
        result['email'] = b['email']
    }
    if (a['password'] !== b['password']) {
        result['password'] = b['password'];
    }
    if (a['phone'] !== b['phone']) {
        result['phone'] = b['phone'];
        Promise.all(sendSms(b));
    }
    if (a['name'] !== b['name']) {
        result['name'] = b['name']
    }
    return result;
}

function cognitoDriver(data, cb, clientId, driverId) {

    driverModel.findOne({_id: mongoose.Types.ObjectId(driverId), clientId: clientId}, (err, driverData) => {
        if (err) {
            result.sendServerError(cb);
        } else {
            //NOTE : password cannot be changed by admin.
            const filterData = Object.assign({}, data,
                {
                    clientId: clientId, role: driverData.role, isDeleted: 0,
                    cognitoSub: driverData.cognitoSub, password: driverData.password,
                    userRole: driverData.userRole, user: driverData.user
                });

            const diff = findCognitoDiff(driverData, data);
            if (helper.isEmptyObj(diff)) {
                upsertDriver(filterData, cb, driverId);
            } else {
                updateCognito(diff, filterData, driverData['phone'], driverId);
            }
        }

    });


    function updateCognito(update, data, userName, driverId) {
        cognito.updateUser(update, userName).then(() => {
            upsertDriver(data, cb, driverId);
        }).catch((err) => sendCognitoError(err, cb));
    }

}

function sendSms(driverData) {
    console.log(driverData);
    return driverModel.findOne({cognitoSub: driverData.clientId}).then((admin) => {
        return smsGateWayModel.find({clientId: admin.cognitoSub}).then((smsGateWayData) => {
            return notify.call(driverData, admin._doc, smsGateWayData);
        })
    }).catch((error) => {
        console.log(error);
    })
}

function upsertDriver(data, cb, driverId) {
    driverModel.update({_id: mongoose.Types.ObjectId(driverId)}, data, {}, function (error, data) {
        if (error) {
            console.log(error);
            handlerError(error, cb);
        } else {
            result.sendSuccess(cb, data);
        }
    });
}

function handlerError(error, cb) {

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
        else if (err.password) {
            result.invalidPassword(cb);
        }
        else if (err.assignTeam) {
            result.TeamMandatory(cb);
        }
        else {
            console.log(err);
            result.invalidInput(cb);
        }
    }


}

function sendCognitoError(err, cb) {
    console.log('cognito error', err);
    const cognito = constant.COGNITO_ERROR;
    if (err.code === cognito.PASSWORD_INVALID) {
        result.invalidPassword(cb);
    } else if (err.code === cognito.EMAIL_EXIST) {
        result.sendDuplicateEmail(cb);
    } else if (err.code === cognito.INVALID_DATA) {
        (err.message === cognito.INVALID_EMAIL) ? result.invalidEmail(cb) : result.invalidPhone(cb);
    } else {
        result.invalidInput(cb);
    }
}

//princial  manager- clientId , role , sub , teams
//admin - sub , role




