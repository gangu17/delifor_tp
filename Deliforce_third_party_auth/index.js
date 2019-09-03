// const context = {
//     succeed: function (data) {
//         console.log(JSON.stringify(data));
//     },
//     fail: function (data) {
//         console.log('fail +' + JSON.stringify(data));
//     }
// };

try {

    const getConstant = require('./constant')();
    // const event = {
    //     "type": "TOKEN",
    //     "methodArn": "arn:aws:execute-api:ap-south-1:204006638324:gd3ox9mdy3/Prod/POST/team",
    //     "authorizationToken": "4VbBivcji7egkafbFbFbnFVmK6eAv6kw8zxGEoG2FdspHnkIbPOv1bSjU2K7WW2XDQcFcFc"
    // }
    exports.handler = (event, context) => {

        console.log(JSON.stringify(event));
        console.log('context', JSON.stringify(context));
        context.callbackWaitsForEmptyEventLoop = false;


        getConstant.then(() => {
            const auth = require('./authorizer');
            const validator = require('./api-key-validation');
            const db = require('./db').connect();
            const authConst = require('./permission').AUTHORIZE;
            const userModel = require('./model');

            //authenticate then authorize;

            db.then(() => validator.checkApiKey(event))
                .then(authorize)
                .catch(sendError);


            function sendError(error) {
                console.log(error);
                context.fail("Unauthorized");
            }

            function authorize(clientId) {
                const policy = auth.createPolicy(event, clientId, authConst.ALLOW);
                userModel.findOne({cognitoSub: clientId}).then((adminDetails) => {
                    adminDetails = adminDetails.toObject();
                    if (adminDetails.isSuspended) {
                        context.fail("Unauthorized");
                    } else {
                        context.succeed(addUserInfoWithPricipal(policy, clientId));
                    }
                });
            }


            //TODO once aws supports send custom data remove this
            function addUserInfoWithPricipal(policy, user) {
                const obj = {
                    sub: user,
                    role: 1
                };
                policy['principalId'] = JSON.stringify(obj);
                console.log(JSON.stringify(policy));
                return policy;
            }

        }).catch((err) => {
            console.log(err);
            context.fail(err);
        });

    };

} catch (err) {
    console.error('error try catch+++', err);
    context.fail("fdfghjkjhgfdfghjhg");
}

// zip -r authorizer *


//var a =
