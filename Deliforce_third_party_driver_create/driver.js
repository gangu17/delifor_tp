const mongoose = require('mongoose');
const result = require('./result');
const helper = require('./util');
const constant = require('./constant')();
const isIt = constant.isIt;
const driverModel = require('./model').DRIVER;
const cognito = require('./cognito');
const notify = require('./notify');
const countryArr = require('./countryCode');
//const driverSettingModel = require('./model').driverSettingModel;
const userPlansModel = require('./model').USERPLANS;
const driverErrorMsgs = require('./error').DRIVER_CODES;
const templateModel = require('./model').template;
const _ = require('lodash');
const randomDriverMarkers = require('./randomLatLan');
var securePin = require("secure-pin");
const teamModel = require('./model').TEAM;
const smsGateWayModel = require('./model').smsGateWay;



module.exports = {

    checkDuplicate: (event, cb, principals, plans) => {
        // const countries = event.headers['CloudFront-Viewer-Country'];
        //  const finalValue =  randomLatLan(countryies);
        // console.log(finalValue);
        const data = helper.getBodyData(event);

        if (!data) {
            result.invalidInput(cb);
        } else {
            const clientId = (helper.isAdmin(principals)) ? principals['sub'] : principals['clientId'];
            var formQuery = basicQuery(data);
            console.log(JSON.stringify(formQuery));
            driverModel.aggregate(formQuery, (err, driver) => {
                if (err) {
                    result.sendServerError(cb)
                } else if (driver.length) {
                    console.log(driver);
                    if (driver[0].email === data.email && driver[0].phone === data.phone) {
                        result.sendDuplicateEmailPhone(cb);
                    } else if (driver[0].email === data.email) {
                        console.log('duplicate key of email');
                        result.sendDuplicateEmail(cb);
                    } else {
                        console.log('duplicate key of phone');
                        result.sendDuplicatePhone(cb);
                    }
                } else {
                    console.log('add driver');
                    console.log(JSON.stringify(data) + ' hello here');
                    teamModel.findOne({teamId: data.assignTeam}).then((teamData) => {
                        console.log(teamData._id + 'teamdata here');
                        data.assignTeam = teamData._id
                        validateDriverData(data, clientId, cb, principals, plans);
                    })
                }
            });
            /* driverModel.findOne({$or: [{'email': data.email}, {'phone': data.phone}], isDeleted: isIt.NO}, (err, driver) => {
               if (err) {
                 result.sendServerError(cb)
               } else if (driver) {
                 driver = driver.toObject();
                 console.log(driver);
                 if (driver.email === data.email) {
                   console.log('duplicate key of email');
                   result.sendDuplicateEmail(cb);
                 } else {
                   console.log('duplicate key of phone');
                   result.sendDuplicatePhone(cb);
                 }
               } else {
                 console.log('add driver');
                 validateDriverData(data, clientId, cb, principals, plans);

               }
             });*/
        }
    }
};


function basicQuery(data) {
    var defaultQuery = [
        {
            '$match': {
                '$or': [
                    {'phone': data.phone}
                ],
                'isDeleted': isIt.NO
            }
        }
    ];

    if (data.email) {
        defaultQuery[0].$match.$or.push({'email': data.email});
    }
    return defaultQuery;

}


//before create cognito user do validate
function validateDriverData(data, clientId, cb, principals, plans) {
    // cognitosub is mock here

    const testData = Object.assign({}, data, {
        clientId: clientId,
        userRole: principals.role,
        user: principals.sub,
        cognitoSub: '23232332',
        driverId: 12345678,
    });
    const driverData = new driverModel(testData);

    driverData.validate((err) => {
        if (err) {
            handlerError(err, cb);
        } else {
            createCognitoUser(data, clientId, cb, principals, plans);
        }
    })

}


function createCognitoUser(data, clientId, cb, principals, plans) {
    cognito.createUser(data).then((cognitoUser) => {
        console.log(cognitoUser);
        if (!cognitoUser.User.Username) {
            return Promise.reject('usersub not found');
        } else {
            console.log('driver Sub ' + cognitoUser.User.Username);
            addDriver(data, clientId, cb, cognitoUser.User.Username, principals, plans);
        }
    }).catch((err) => sendCognitoError(err, cb));
}


function sendCognitoError(err, cb) {
    console.log('cognito error', err);
    const cognito = constant.COGNITO_ERROR;
    if (err.code === cognito.PASSWORD_INVALID) {
        result.invalidPassword(cb);
    } else if (err.code === cognito.EMAIL_EXIST) {
        result.sendDuplicatePhone(cb);
    } else if (err.code === cognito.INVALID_DATA) {
        (err.message === cognito.INVALID_EMAIL) ? result.invalidEmail(cb) : result.invalidPhone(cb);
    } else {
        result.sendServerError(cb);
    }
}

function randomLatLan(countryies) {
    const mapper = randomDriverMarkers;
    for (let key in mapper) {
        if (key === countryies) {
            return mapper[key].sample();
        }
    }
}

// dummy  driver location data.
// in tookens they stored the location of driver is mandatory while creating driver

Array.prototype.sample = function () {
    return this[Math.floor(Math.random() * this.length)];
};


function getCountryCodeJSON(code) {
    return new Promise((resolve, reject) => {
        countryArr.forEach((item) => {
            if (code === item.code) {
                resolve(item.codeName);
            }
        })
    });
}


function addDriver(data, clientId, cb, sub, principals, plans) {
    getCountryCodeJSON(data.phone.substr(0, data.phone.indexOf(' '))).then((countryName) => {
        console.log('country', countryName);
        const callback = cb;
        Object.assign(data, {
            'clientId': clientId, cognitoSub: sub,
            userRole: principals.role, user: principals.sub
        });

        let driverRanLocation = randomLatLan(countryName);
        data.driverId = securePin.generatePinSync(8);
        console.log(driverRanLocation);
        const newDriver = new driverModel(data);
        console.log(JSON.stringify(data));
        console.log(data.transportType + 'kkkkkkkkkkkkkkkkkkkkk');

        let transportType = (data.settings.transportType) ? data.settings.transportType : 6;
        newDriver.settings.transportType = transportType;
        let loc = {type: "Point", coordinates: [driverRanLocation.lng, driverRanLocation.lat]};
        newDriver.location = loc;
        newDriver.save(function (error, data) {
            if (error) {
                console.log(error);
                console.log('error block');
                handlerError(error, callback)
            }
            else {
                // Object.assign(driverSettings,{clientId:sub});
                // const driverSettingsmodel = new driverSettingModel(driverSettings);
                const finalCount = plans.agentCount + 1;
                // console.log('add driver block');
                Promise.all([sendSms(data), userPlansModel.update({clientId: clientId}, {agentCount: finalCount})])
                    .then((res) => {
                        result.sendSuccess(callback, data)
                    }).catch(handlerError)
            }
        })
    })
}


//for sending sms according to DB Template


function sendSms(driverData) {
    console.log(driverData);
    return driverModel.findOne({cognitoSub: driverData.clientId}).then((admin) => {
        console.log('driverData' + driverData);
        return smsGateWayModel.find({clientId: admin.cognitoSub}).then((smsGateWayData) => {
            return notify.call(driverData._doc, admin._doc, smsGateWayData);
        });
    }).catch((error) => {
        console.log(error);
    })
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



