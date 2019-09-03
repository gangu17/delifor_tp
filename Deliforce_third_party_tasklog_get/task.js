const result = require('./result');
const taskLog = require('./model').taskLog;
const helper = require('./util');
const mongoose = require('mongoose');
const task = require('./model').task;
const moment = require('moment-timezone');


module.exports = {


    fetchTaskLog: (event, cb, principals) => {
        const data = helper.getQueryData(event);
        console.log(JSON.stringify(data) + 'data here');
        if (!data) {
            result.invalidInput(cb);
        }
        console.log(JSON.stringify(data) + 'data here');
        //const query = formQuery(principals, data);
        const clientId = helper.isAdmin(principals) ? principals['sub'] : principals.clientId;
        //Object.assign({TaskId: mongoose.Types.ObjectId(data.TaskId),clientId:clientId})
        var taskid = data.taskId[0];
        console.log('taskid' , typeof taskid);
        task.findOne({'taskId': taskid,isDeleted:0}).then((taskDetails) => {
            let newTasklogList = {};
            const taskInfo = (taskDetails) ? taskDetails.toObject() : '';
            console.log('task', taskInfo);
            const timezone = (taskInfo && taskInfo.timezone) ? taskInfo.timezone : 'Asia/Calcutta';
            console.log('taskInfo', timezone);
            return taskLog.find({taskId: taskInfo._id.toString(),})
                .then((data) => {
                  console.log(data + 'no data here')
                    newTasklogList = data.map(function (taskData) {
                        //console.log('each task',JSON.stringify(t));
                        let t = taskData.toObject();
                        let stDate = new Date(t.created_at);
                        //  let m = moment.utc(stDate, "YYYY-MM-DD h:mm:ss A");
                        // t.created_at = m.tz(timezone).format("YYYY-MM-DD h:mm:ss A");


                        return t;
                    });
                    console.log('newTasklog', newTasklogList);

                    result.sendSuccess(cb, newTasklogList.reverse());

                });
        }).catch((error) => {
            console.log(error);
            result.sendServerError(cb);
        });

    }
};


// function formQuery(principals, qryData) {
//   const query;
//  console.log(principals);
//   //add auth query
//   if (helper.isAdmin(principals)) {
//     query['clientId'] = principals['sub'];
//   } else {
//     //manager
//     console.log(principals)
//     query['clientId'] = principals.clientId;
//     //assign Team is needed?
//     //query['assignTeam'] = {'$in': principals['teams']};
//   }
//   console.log(query);
//   return query;
// }
