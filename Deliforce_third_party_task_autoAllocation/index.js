let cb;
// function callback(err,data) {
//     console.log(err,data);
// }

try {

// const event=require('./driverArry');
  const getConstant = require('./constant')();

  exports.handler = (event, context, callback) => {
    console.log(JSON.stringify(event));
    console.log('context', JSON.stringify(context));
    cb = callback;
    context.callbackWaitsForEmptyEventLoop = false;
    getConstant.then(() => {
      //imports
      const db = require('./db').connect();
      const oneByOne = require('./backgroundJob');
      const nearest = require('./nearestAllocation');

      const sendTo = require('./sendAll');
      const rignToneArr = require('./iosRignTone').rignTone;// AWS.config.update({
      const driverModel = require('./model').Driver;
      const mongoose = require('mongoose');



      //connect to db
      return db.then(() => {

        return getSound(event.driverData[0].driverId).then((ringtone)=>{

          if (event.autoAllocation.nearest.current === true) {
            return nearest.nearestAllo(event, cb,ringtone);
          } else if (event.autoAllocation.sendToAll.current === true) {
            return sendTo.sendToAllDrivers(event, cb,ringtone);
          } else if (event.autoAllocation.oneByOne.current === true) {
            return oneByOne.doBackGroundJob(event, cb,ringtone)
          }
        })

        function getSound(driverId) {
          let dynamicTone;
          if (driverId) {
            console.log(driverId);
            return driverModel.findOne({_id: mongoose.Types.ObjectId(driverId)}, {
              settings: 1,
              _id: 0
            }).then((result) => {
              console.log(JSON.stringify(result));
              let finalRes = result.toObject().settings.ringtone;
              console.log(finalRes);
              for (let key in rignToneArr) {
                if (key == finalRes) {
                  dynamicTone = rignToneArr[key].name;
                  console.log(dynamicTone);
                  return dynamicTone;
                }
              }
            })
          }
        }
      }).catch(sendError);

      function sendError(error) {
        console.error('error +++', error);


      }
    }).catch((err) => {
      console.log(err);
      cb(null, 'errormessage');
    });

  };

} catch (err) {
  console.error('error +++', err);
  cb(null, 'errormessage');
  // result.sendServerError(cb);
}
