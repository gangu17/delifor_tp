const result = require('./result');
const taskModel = require('./model').task;
const helper = require('./util');
const constant = require('./constant')();
const isIt = constant.isIt;
const role = constant.ROLE;
const mongoose = require('mongoose');
const moment = require('moment-timezone');


module.exports = {
   getTasks: (event, cb, principals) => {
      const data = helper.getQueryData(event);
      console.log(JSON.stringify(data) + 'data herrr');
      if (!data) {
         result.invalidInput(cb);
      }

      formQuery(principals, data).then((finalQuery) => {


         taskModel.aggregate([
            {
               $lookup:
                   {
                      from: 'users',
                      localField: 'driver',
                      foreignField: '_id',
                      as: 'driverDetails'
                   }
            },
             finalQuery
         ]).then((output) => {
            console.log('finaloutput', JSON.stringify(output));
            if (typeof data.page[0] === 'string') {
               data.page[0] = Number(data.page[0]);
            }
            if (typeof data.limit[0] === 'string') {
               console.log('jjjjjjjj');
               data.limit[0] = Number(data.limit[0]);
               console.log(data.limit[0]);
            }

            let page = (data && data.page) ? data.page[0] : 1;
            let limit = (data && data.limit) ? data.limit[0] : 10;
            let start = (page - 1) * 10;
            let end = start + limit;
            let finalOutput = {docs: [], total: 0, limit: limit, page: page};
            if (!output.length) {
               result.sendSuccess(cb, finalOutput)
            }else{
               finalOutput.total = output.length;
             //  finalOutput.pages = (finalOutput.total <= 10) ? 1 : finalOutput.total / limit;
               let taskList = output.slice(start, end);
               console.log('taskList', JSON.stringify(taskList));

               return ReturnSortedTasks(taskList, data).then((newTaskList) => {
                  console.log("Line 121", JSON.stringify(newTaskList));
                  console.log(newTaskList);

                  finalOutput.total = newTaskList.length;
                  finalOutput.docs = newTaskList;
                  //Change end
                  result.sendSuccess(cb, finalOutput);
               })
            }
         });

      });
   }
};

function formQuery(principals, qryData) {
   console.log(JSON.stringify(principals) + 'heeeeeeeeeeerrrrrrrrrrreeeeeeeeeeeee');
   return new Promise((resolve, reject) => {

      const defaultQuery = {
         $match: {
            $and: [

               {isDeleted: isIt.NO}

            ]
         }
      };
      const query = defaultQuery;
       console.log('asdasdasda', qryData.timezone);

       if (qryData.taskIds) {
           query.$match.$and.push({taskId: {$in: qryData.taskIds}});
       }

       if (qryData.startDate && qryData.endDate) {
           let s1 = moment.tz(new Date(qryData.startDate), 'YYYY-MM-DD', qryData.timezone[0])
           let e1 = moment.tz(new Date(qryData.endDate), 'YYYY-MM-DD', qryData.timezone[0])
           const startDate = s1.clone().startOf('day').utc();
           const dateMidnight = e1.clone().endOf('day').utc();
           let date = {
               $gt: new Date(startDate),
               $lt: new Date(dateMidnight)
           };
           console.log('date search ' + JSON.stringify(date));
           query.$match.$and.push({date: date});
           console.log('date search ' + JSON.stringify(query));
       }

      query.$match.$and.push({'clientId': principals['sub']});
      console.log(JSON.stringify(query) + 'query herrreee');
      resolve(query);
   })
}

function ReturnSortedTasks(taskList, data) {
   return new Promise(function (resolve, reject) {
      var taskarry = []
      newTaskList = taskList.filter(function (taskData) {
         console.log('for loop taskData', JSON.stringify(taskData));
         let t = taskData;
         let stDate = new Date(t.date);
         let tz = (data.timezone[0]) ? data.timezone[0] : 'Asia/Calcutta';
         console.log('timezone', stDate);
         let m = moment.utc(stDate, "YYYY-MM-DD h:mm:ss A");
         t.date = m.tz(tz).format("YYYY-MM-DD h:mm:ss A");
         if (t.businessType === 2 || t.businessType === 3) {
            let endDate = t.endDate;
            let m1 = moment.utc(endDate, "YYYY-MM-DD h:mm:ss A");
            t.endDate = m1.tz(tz).format("YYYY-MM-DD h:mm:ss A");
         }


         // var date1 = new Date(taskData.date).getDate();
         // var comdate1 = new Date(data.startDate[0]).getDate();
         // var comdate2 = new Date(data.endDate[0]).getDate();
         // if (date1 >= comdate1 && date1 <= comdate2) {
         //    console.log('coming here');
         //    taskarry.push(t);
             return t;
         // }
      })
      console.log(JSON.stringify(taskarry));
      resolve(newTaskList);
   }).catch((err) => {
      console.log(err + 'here')
   })
}