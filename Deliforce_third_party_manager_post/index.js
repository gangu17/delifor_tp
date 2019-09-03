let cb;
const result = require('./result');

try {

  const getConstant = require('./constant')();

  // const callback = (err, data) => {
  //   console.log(err, data);
  // };
  // const event = require('../../../mock').admin.event;
  // event.body = require('../../../mock').admin.event.body;

  exports.handler = (event, context, callback) => {
    console.log('event', JSON.stringify(event));
    cb = callback;
    context.callbackWaitsForEmptyEventLoop = false;


    getConstant.then(() => {
      //imports
      const db = require('./db').connect();
      const manager = require('./manager');
      const helper = require('./util');

      //for trigger
      if (helper.checkFromTrigger(cb, event)) return;

      // check for cognito sub
      const principals = helper.getPrincipals(cb, event);
      if (!principals.sub) return;

      db.then(() => manager.createManager(cb, event, principals))
        .catch((err) => result.sendServerError(cb));

    }).catch((err) => {
      console.log(err);
      result.sendServerError(cb);
    });


  };

} catch (err) {
  console.error('error ++++++', err);
  result.sendServerError(cb);
}
// manager_add.zip
// manager not allowed
