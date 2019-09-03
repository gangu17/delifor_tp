let cb;
const result = require('./result');

try {
    const getConstant = require('./constant')();
    // const callback = function (err, data) {
    //     console.log('callback called+++++++++++++++++++++++++++++++++');
    //     console.log(err, data);
    // };
    // const event = require('../mock').admin.event;
    // event.queryStringParameters = require('../mock').admin.event.queryStringParameters;

    exports.handler = (event, context, callback) => {
        console.log('event', JSON.stringify(event));
        cb = callback;
        context.callbackWaitsForEmptyEventLoop = false;

        getConstant.then(() => {
            //imports
            const db = require('./db').connect();
            const webhook = require('./webhook');
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
            // console.log(JSON.stringify(principals));
            if (!principals) return;

            //connect to db change
            return db.then(() => webhook.getTeams(event, cb, principals)).catch(sendError);

            function sendError(error) {
                console.error('problem wtih db connection error +++', error);
                result.sendServerError(cb);
            }
        }).catch((err) => {
            console.log(err);
            result.sendServerError(cb)
        });
    };

} catch (err) {
    console.error('global catch error +++', err);
    result.sendServerError(cb);
}
