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
            const db = require('./db').connect();
            const helper = require('./util');
            const zap = require('./zap');

            const principals = helper.getPrincipals(cb, event);
            if (!principals) return;

            return db
                .then(() => zap.auth(event, cb, principals))
                .catch((error) => {
                    console.error('+++ error connecting db +++', error);
                    result.sendServerError(cb);
                });
        }).catch((error) => {
            console.error('+++ error connecting db +++', error);
            result.sendServerError(cb);
        });
    };
} catch (err) {
    console.error('global catch error +++', err);
    result.sendServerError(cb);
}
