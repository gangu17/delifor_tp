const result = require('./result');
const driverModel = require('./model').driverModel;
const helper = require('./util');
const constant = require('./constant')();
const mongoose = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;
module.exports = {

  getDriverLocation: (event, cb, principals) => {

    let data = helper.getQueryData(event);
    console.log('data', JSON.stringify(data));
    console.log('data', typeof data);

    const clientId = principals['sub'];

    if (!data.driverId) {
      return result.invalidInput(cb);
    } else {

      driverModel.findOne({'clientId': clientId, role: constant.ROLE.DRIVER,
          '_id': mongoose.Types.ObjectId(data.driverId)},{'location':1,'currentAddress':1})
        .then((response) =>{
          console.log('DriverLocationAndAddressDetails' + JSON.stringify(response));
          return result.sendSuccess(cb, response);
        }).catch((error) => {
          console.log('error', error);
          result.sendServerError(cb)
        })
    }
  }
};

