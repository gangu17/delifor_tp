const result = require('./result');
const customerModel = require('./model');
const helper = require('./util');
const constant = require('./constant')();
const isIt = constant.isIt;

module.exports = {
  fetchCustomer:(event, cb, principals)=> {
    const clientId = (helper.isAdmin(principals)) ? principals['sub'] : null;
    if(!clientId){
      result.sendUnAuth(cb);
    }else {
        const data = helper.getQueryData(event);
        console.log('data', data);
        console.log(typeof data.page);
        if(typeof data.page[0] === 'string'){
            data.page[0] = Number(data.page[0]);
        }
        if(typeof data.limit[0] === 'string'){
            data.limit[0] = Number(data.limit[0]);
        }
      console.log('data', JSON.stringify(data));
      if(!data){
        result.invalidInput(cb);
      }
        const query = {clientId: clientId, isDeleted: isIt.NO};
      if(data.customerIds){
        query.customerId = {$in: data.customerIds}
      }
      console.log('query', query);
      customerModel.paginate(query, {
        page: data.page[0] || 1,
        limit: data.limit[0] || 10,
        sort: {'created_at': -1}
      }, function (err, customers) {
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






