let cb;
const result = require('./result');

try {

  const getConstant = require('./constant')();
  // const callback = function (err, data) {
  //   console.log('callback called+++++++++++++++++++++++++++++++++');
  //   console.log(err, data);
  // };
  exports.handler = (event, context, callback) => {

   // const event = require('../../../mock').admin.event;
   // event.body = require('../../../mock').admin.event.body;
    cb = callback;
    context.callbackWaitsForEmptyEventLoop = false;

    getConstant.then(() => {
      //imports
      const db = require('./db').connect();
      const task = require('./task');
      const helper = require('./util');

      if (helper.checkFromTrigger(cb, event)) return;

      /*
      principals explanation: for admin sub is clientId for manager clientId is clientId
      {  sub: 'current user cognitosub',
      role: 'role id of user',
      clientId:'exist if user is manager & this is clientid of that manager',
      teams: 'team Assigned to manager' }
      */

      const principals = helper.getPrincipals(cb, event);
      if (!principals) return;
      console.log(JSON.stringify(principals));


      //connect to db
      db.then(() => task.updateTaskStatus(event, cb, principals)).catch(sendError);

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


//zip -r task-multiplestatusChange.zip *




