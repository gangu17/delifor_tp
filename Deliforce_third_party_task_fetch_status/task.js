const result = require('./result');
const taskModel = require('./model');
const helper = require('./util');
const constant = require('./constant')();
const isIt = constant.isIt;

module.exports = {

    getTaskStatus: (event, cb, principals) => {
    const clientId = principals['sub'];
    console.log('clientId', JSON.stringify(clientId));
    if (!clientId) {
      result.sendUnAuth(cb);
    } else {
      const data = helper.getQueryData(event);
      console.log('data', JSON.stringify(data));
      if (!data.taskId) {
        result.invalidInput(cb);
      }
      const query = {taskId: data.taskId};
        taskModel.findOne(query ,{ taskStatus: 1}, function (err, task) {
        console.log(err, task);
        if (err) {
          console.log(err);
          result.sendServerError(cb);
        } else {
          console.log(task);
          result.sendSuccess(cb, task);
        }
      });
    }
  }
};







