const result = require('./result');
const webHookModel = require('./model');
const helper = require('./util');
const constant = require('./constant')();
const isIt = constant.isIt;


module.exports = {
    getTeams: (event, cb, principals) => {
        const clientId = principals['sub'];
        const data = helper.getQueryData(event);
        let query = {isDeleted: isIt.NO, clientId: clientId};

        if(data.webhookIds){
            query.webhookId = {$in: data.webhookIds};
        }
        webHookModel.find(query).then((webHooks) => {
            result.sendSuccess(cb, webHooks)
        }).catch((err) => {
            console.log(err);
            result.sendServerError(cb);
        })
    }
}



