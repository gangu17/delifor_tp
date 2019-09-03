const result = require('./result');
const constant = require('./constant')();
const webhookModel = require('./model').webhookModel;
const helper = require('./util');
const isIt = constant.isIt;
const mongoose = require('mongoose');


module.exports = {
    delete: (event, cb, principals) => {
        const clientId = (helper.isAdmin(principals)) ? principals['sub'] : principals['clientId'];
        //  const clientId = "abb8a93b-ed84-4600-8350-8e06f501c27b";
        if (!clientId) {
            result.sendUnAuth(cb);
        }
        const data = helper.getQueryData(event);
        console.log("data", JSON.stringify(data));
        webhookModel.update({webhookId: data.webhookId, isDeleted: isIt.NO}, {isDeleted:isIt.YES})
            .then((data) => {
                result.sendSuccess(cb, data);
            }).catch(() => {
            result.sendServerError(cb);
        });
    }
};