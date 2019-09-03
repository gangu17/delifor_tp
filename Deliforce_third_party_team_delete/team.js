const result = require('./result');
const constant = require('./constant')();
const teamModel = require('./model').teamModel;
const driverModel = require('./model').driverModel;
const helper = require('./util');
const isIt = constant.isIt;
const mongoose = require('mongoose');


module.exports = {
    checkDriver: (event, cb, principals) => {
        const clientId = principals.sub;  //  const clientId = "abb8a93b-ed84-4600-8350-8e06f501c27b";
        if (!clientId) {
            result.sendUnAuth(cb);
        }
        const data = helper.getQueryData(event);
        // if (typeof data.limit[0] === 'string') {
        //     data.limit[0] = Number(data.limit[0]);
        // }
        // if (typeof data.page[0] === 'string') {
        //     data.page[0] = Number(data.page[0]);
        // }
        teamModel.findOne({teamId: data.teamId}).then((teamRes) => {
            console.log('teamRes', JSON.stringify(teamRes));
            data._id = teamRes._id;
            console.log('data', JSON.stringify(data));
            driverModel.findOne({clientId: clientId, assignTeam: mongoose.Types.ObjectId(data._id), isDeleted: isIt.NO})
                .then((driverResult) => {
                    console.log('driverResult', JSON.stringify(driverResult));
                    if (driverResult) {
                        result.teamHasDriver(cb);
                        return;
                    } else {
                        deleteTeam(data, clientId, cb);
                    }
                })
                .catch(() => {
                    result.sendServerError(cb);
                });
        });
    }
};

function deleteTeam(data, clientId, cb) {
    teamModel.update({teamId: data.teamId, clientId: clientId}, {isDeleted: isIt.YES}, {multi: false}).then((data) => {
        result.sendSuccess(cb, data);
    }).catch(() => {
        result.sendServerError(cb);
    });
}

