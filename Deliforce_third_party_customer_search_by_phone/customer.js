const result = require('./result');
const customerModel = require('./model');
const helper = require('./util');
const constant = require('./constant')();
const isIt = constant.isIt;

module.exports = {

  fetchCustomerByPhone: (event, cb, principals) => {
    const clientId = principals['sub'];
    console.log('clientId', JSON.stringify(clientId));

    if (!clientId) {
      result.sendUnAuth(cb);
    } else {
      const data = helper.getQueryData(event);
      console.log('data', JSON.stringify(data));
      if (!data.phone) {
        result.invalidInput(cb);
      }

      const query = {clientId: clientId, isDeleted: isIt.NO,phone: {$regex: new RegExp("[+/\d+/ ]" + data.phone)}};

      customerModel.findOne(query, function (err, customers) {
        console.log(err, customers);
        if (err) {
          console.log(err);
          result.sendServerError(cb);
        } else {
          console.log(customers);
          result.sendSuccess(cb, customers);
        }
      });
    }
  }
};







