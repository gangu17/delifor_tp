const result = require('./result');
const customerModel = require('./model');
const helper = require('./util');
const constant = require('./constant')();
const isIt = constant.isIt;

module.exports = {
  fetchCustomerByName:(event, cb, principals) => {
    const clientId =  principals['sub'];
    if(!clientId){
      result.sendUnAuth(cb);
    }else {
      const data = helper.getQueryData(event);
      if(!data){
        result.invalidInput(cb);
      }
      console.log(JSON.stringify(data));
      console.log(JSON.stringify(data.name));

      const query = {clientId: clientId, isDeleted: isIt.NO, name: {$regex: `.*${data.name}.*`, '$options': 'i'}};

      customerModel.find(query).then((data)=> {
        result.sendSuccess(cb,data)
      }).catch((err)=> {
        console.log(err);
        result.sendServerError(cb);
      })
    }
  }
};







