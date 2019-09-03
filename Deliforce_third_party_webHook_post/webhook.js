const result = require('./result');
const helper = require('./util');
const constant = require('./constant')();
const isIt = constant.isIt;
const webhookModel = require('./model');
const securePin = require("secure-pin");

module.exports = {
    create: (event, cb, principals) => {
        const clientId = (helper.isAdmin(principals)) ? principals['sub'] : principals['clientId'];
        const data = helper.getBodyData(event);
         const webhookObj = {
             1:'taskUnassigned',
             2:'taskAssigned',
             3:'taskAccepted',
             4:'taskStarted',
             6:'taskCompleted',
             7:'taskFailed',
             8:'taskDeclined',
             9:'taskCancelled',
             10:'taskAcknowledge',
             14:'taskDeleted',
             25:'taskUpdated'
         }

        // {id: 1, text:  'Task unassigned'},
        // {id: 2, text:  'Task assigned'},
        // {id: 3, text:  'Task accepted'},
        // {id: 4, text:  'Task started'},
        // {id: 6, text:  'Task completed'},
        // {id: 7, text:  'Task failed'},
        // {id: 8, text:  'Task declined'},
        // {id: 9, text:  'Task cancelled'},
        // {id: 10, text: 'Task acknowledge'},
        // {id: 14, text: 'Task deleted'},
        // {id: 25, text: 'Task updated'}];
        //
        //
        // nt('WEBHOOK.taskUnassigned');
        // this.Webhook_trigger[1].text = this.translate.instant('WEBHOOK.taskAssigned');
        // this.Webhook_trigger[2].text = this.translate.instant('WEBHOOK.taskAccepted');
        // this.Webhook_trigger[3].text = this.translate.instant('WEBHOOK.taskStarted');
        // this.Webhook_trigger[4].text = this.translate.instant('WEBHOOK.taskCompleted');
        // this.Webhook_trigger[5].text = this.translate.instant('WEBHOOK.taskFailed');
        // this.Webhook_trigger[6].text = this.translate.instant('WEBHOOK.taskDeclined');
        // this.Webhook_trigger[7].text = this.translate.instant('WEBHOOK.taskCancelled');
        // this.Webhook_trigger[8].text = this.translate.instant('WEBHOOK.taskAcknowledge');
        // this.Webhook_trigger[9].text = this.translate.instant('WEBHOOK.taskDeleted');
        // this.Webhook_trigger[10].text = this.translate.instant('WEBHOOK.taskUpdated');
        if (!data) {
            result.invalidInput(cb);
        }
        data.clientId = clientId;
        var urlExists = require('promised-url-exists');
        urlExists(data.url).then((res) => {
            console.log(JSON.stringify(res) + 'line 24') ;
            if(res.exists === false) {
                result.sendUrlNotExixts(cb);
            } else {

            var trigger = data.trigger
                webhookModel.find({
                    clientId: clientId,
                    trigger: trigger,
                    isDeleted: isIt.NO,
                }).then((resultData) => {
                    if (resultData.length) {
                        console.log(JSON.stringify(resultData));
                        result.duplicateTrigger(cb);
                    } else {
                        upsertTrigger(data, clientId, cb, webhookObj);
                    }
                })
            }
        }).catch((err) => {
            console.log(err);
            result.sendServerError(cb);
        })
    }
};

function upsertTrigger(data, clientId, cb, webhookObj) {
    console.log('38'+JSON.stringify(data) );
    let promise;
    data.name = data.webhookName;
    data.webhookId = securePin.generatePinSync(8);
    data.triggerName = webhookObj[data.trigger]
    const newTrigger = new webhookModel(data);
    promise = newTrigger.save();
    promise.then((data) => {
        result.sendSuccess(cb, data);
    }).catch((error) => {
        console.log(error + 'line 44');
        result.sendServerError(cb);
    });
}

