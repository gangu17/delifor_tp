let cb;
const result = require('./result');

try {
    const getConstant = require('./constant')();
    // const callback = function (err, data) {
    //     console.log('callback called+++++++++++++++++++++++++++++++++');
    //     console.log(err, data);
    // };
    // const event = require('../mock').admin.event;
    // event.body = require('../mock').admin.event.body;

    exports.handler = (event, context, callback) => {

        console.log(JSON.stringify(event));
        cb = callback;
        context.callbackWaitsForEmptyEventLoop = false;

        getConstant.then(() => {
            //imports
            const db = require('./db').connect();
            const task = require('./task');
            const helper = require('./util');
            const userPlansModel = require('./model').userPlansModel;
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
            const data = helper.getBodyData(event);
            if (!data) {
                result.invalidInput(cb);
            }
            else {
                const clientId = principals['sub'];
                userPlansModel.findOne({clientId: clientId}).then((plan) => {
                    console.log('plans' + plan);
                    const plans = plan.toObject();
                    if ((plans.planType === 1 && plans.taskCount < plans.taskLimit) || (plans.planType === 2)) {

                        console.log('succeess plan conditions');
                        return db.then(() => task.saveTask(event, cb, principals, plans)).catch((err) => {
                            console.log(err);
                            result.sendServerError(cb)
                        });
                    } else {
                        result.PackageLimt(cb)
                    }
                    //
                })
            }
        }).catch((err) => {
            console.log(err);
            result.sendServerError(cb)
        });

   }
} catch (err) {
    console.error('error +++', err);
    result.sendServerError(cb);
}
