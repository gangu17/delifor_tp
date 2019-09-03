let cb;
const result = require('./result');

try {

  const getConstant = require('./constant')();

  // const callback = function (err, data) {
  //   console.log('callback called+++++++++++++++++++++++++++++++++');
  //   console.log(err, data);
  // };
  // const event = require('../../../mock').admin.event;
  // event.body = require('../../../mock').data.driverBlockUnblock;


  exports.handler = (event, context, callback) => {

    cb = callback;
    context.callbackWaitsForEmptyEventLoop = false;


    getConstant.then(() => {
      //imports
      const db = require('./db').connect();
      const driver = require('./driver');
      const helper = require('./util');


      if (helper.checkFromTrigger(cb, event)) return;

      const principals = helper.getPrincipals(cb, event);
      if (!principals) return;

      //connect to db
      db.then(() => driver.BlockUnblock(event, cb, principals)).catch(sendError);

      function sendError(error) {
        console.error('error +++', error);
        result.sendServerError(cb);
      }
    }).catch((err) => {
      console.log(err);
      result.sendServerError(cb);
    });
  };
} catch (err) {
  console.error('error +++', err);
  result.sendServerError(cb);
}

// driver_blockUnblock.zip
