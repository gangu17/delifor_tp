const result = require('./result');
const helper = require('./util');
const model = require('./model');
const driverM = model.driverModel;
const mongoose = require('mongoose');

module.exports = {
  BlockUnblock: (event, cb, principals) => {
    const data = helper.getBodyData(event);
    console.log(data);
    console.log('line 12');
    if (!data) {
      result.invalidInput(cb);
    } else {
      const clientId = principals.sub;
      driverM.findOne({_id: mongoose.Types.ObjectId(data._id), clientId: clientId}, function (error, DriverResult) {
        console.log(DriverResult);
        if (error) {
          result.sendServerError(cb);
        }
        else {
          var previousStatus = DriverResult.driverStatus;
          driverM.update({_id: data._id, clientId: clientId}, {
              $set: {
                driverStatus: data.driverStatus,
                'previousStatus': previousStatus
              }
            }
          ).then((data) => {
            result.sendSuccess(cb, data);
          }).catch((err) => {
            result.sendServerError(cb);
          });
        }
      });
    }
  }
};
// driver_blockUnblock.zip
