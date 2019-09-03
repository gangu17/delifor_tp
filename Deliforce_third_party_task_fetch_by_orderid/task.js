const mongoose = require('mongoose');
const result = require('./result');
const helper = require('./util');
const constant = require('./constant')();

//const settingModel = require('./model').setting;
const taskModel = require('./model').task;
const userModel = require('./model').user;


module.exports = {
  init: (event, cb, principals) => {
    const data = helper.getQueryData(event);
    // const clientId = (helper.isAdmin(principals)) ?  : principals['clientId'];

    // const clientId = "ec2d678b-fc8d-437d-a04d-d311d6100d0b";

    const clientId = principals['sub'];
    console.log('data=', JSON.stringify(data));
    let fields = {
      isDeleted: 1,
      name: 1,
      phone: 1,
      color: 1,
      address: 1,
      date: 1,
      endDate: 1,
      settings: 1,
      taskId: 1,
      email: 1,
      orderId: 1,
      taskStatus: 1,
      created_at: 1
    };
    // order = '2343546';
    // data.orderId = order;

    taskModel.find({orderId: data.orderId, clientId: clientId}, fields)
      .then((response) => {
        console.log('res', response);
        if (response) {
          result.sendSuccess(cb, response);
        } else {
          result.sendSuccess(cb, {})
        }

      })
      .catch((err) => {
        console.log(err);
        result.sendServerError(cb);
      });
  }
};


