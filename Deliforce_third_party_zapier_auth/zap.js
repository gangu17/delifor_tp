const result = require('./result');
const userModel = require('./model');
const helper = require('./util');
const constant = require('./constant')();

module.exports = {
    auth: (event, cb, principals) => {
        const clientId = principals['sub'];

        userModel.findOne({cognitoSub: clientId, isDeleted: 0, isBlocked: 0, role: 1}).then((user) => {
            if(user) {
                console.log('user', JSON.stringify(user));
                result.sendSuccess(cb, null);
            }else {
                result.sendUnAuth(cb);
            }
        }).catch((err) => {
            console.log(err);
            result.sendServerError(cb);
        })
    }
};