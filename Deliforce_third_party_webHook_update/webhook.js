const mongoose = require('mongoose');
const result = require('./result');
const helper = require('./util');
const constant = require('./constant')();
const isIt = constant.isIt;
const webhookModel = require('./model');

module.exports = {
    update: (event, cb, principals) => {
        const clientId = (helper.isAdmin(principals)) ? principals['sub'] : principals['clientId'];
        const data = helper.getBodyData(event);
        // const data = {
        //     name: "hello",
        //     trigger: 4,
        //     url: "https://www.app.deliforce.io"
        // };
        //   data.clientId = "9846184651asd486a5sda4sd5ad45";
        if (!data) {
            result.invalidInput(cb);
        }
        //data.clientId = clientId;
        console.log('This is dataline 21 :', data);

        webhookModel.update({webhookId:data.webhookId, isDeleted: isIt.NO}, {url:data.url,name:data.webhookName}).then((resultData) => {
            result.sendSuccess(cb, resultData);
        }).catch((err) => {
            console.log(err);
            result.sendServerError(cb);
        })
    }
};

//zip -r Deliforce_webHook_update *