const result = require('./result');
const userModel = require('./model').user;
const helper = require('./util');
var AWS = require('aws-sdk');
AWS.config.region = 'ap-south-1';
const constant = require('./constant')();
const driverStatus = constant.DRIVER_STATUS;

module.exports = {
    changeStatus: (event, cb, principals) => {
        const clientId = principals;
        const data = helper.getBodyData(event);
        console.log('data+++++++', data);
        console.log('clientId++++++++', clientId);
        if (!data) {
            result.invalidInput(cb);
        } else {
            return userModel.findOne({driverId: data.driverId}).then((driverRes) => {
                console.log(driverRes);
                let driverDetails = (driverRes.toObject()) ? driverRes.toObject() : driverRes;
                let finalQuery = formQuery(data, driverDetails);
                return userModel.findOneAndUpdate({driverId: data.driverId}, {$set: finalQuery}, function (err, res) {
                    if (err) {
                        result.sendSuccess(cb, {'message': 'driver status is not update'});
                    } else {
                        result.sendSuccess(cb, {'message': 'driver Status updated suceessfull'});

                    }
                }).catch((error) => {
                    console.log('err', error);
                    result.sendServerError(cb);
                });

            }).catch((error) => {
                console.log('err', error);
                result.sendServerError(cb);
            });
        }
    }
};


function formQuery(data, driverDetails) {
    let finalDriverStatus;
    let location = {type: 'Point', coordinates: [Number(data.longitude), Number(data.latitude)]};
    if (driverDetails.driverStatus === driverStatus.BLOCKED) {
        finalDriverStatus = driverStatus.BLOCKED
    } else {
        finalDriverStatus = data.driverStatus;
    }
    const query = {
        driverStatus: finalDriverStatus,
        location: location,
        currentAddress: (data.address) ? (data.address) : " "
    };
    if (data.isLogOut && data.isLogOut === true) {
        query.endpointArn = "";
        query.deviceToken = "";
    }
    return query;
}
