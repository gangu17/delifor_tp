const result = require('./result');
const managerModel = require('./model').Manager;
const helper = require('./util');
const constant = require('./constant')();
const isIt = constant.isIt;

module.exports = {
  fetchManager: (event, cb, principals) => {
    // const clientId = "2cfd77c9-039d-4852-8924-99212d57a585";
    const clientId = (helper.isAdmin(principals)) ? principals['sub'] : null;
    if (!clientId) {
      result.sendUnAuth(cb);
    } else {
      const data = helper.getQueryData(event);

        console.log(data + 'line number 15');
        console.log(typeof data.page);
        if(typeof data.page[0] === 'string'){
            data.page[0] = Number(data.page[0]);
        }
        if(typeof data.limit[0] === 'string'){
            data.limit[0] = Number(data.limit[0]);
        }
        console.log('data', JSON.stringify(data));

      if (!data) {
        result.invalidInput(cb);
      }
      const query = {clientId: clientId, role: constant.ROLE.MANAGER, isDeleted: isIt.NO};
        if(data.managerIds && data.managerIds.length){
            query.managerId = {$in: data.managerIds}
        }
        console.log('query', query);
      managerModel.paginate(query, {
        page: data.page[0] || 1,
        limit: data.limit[0] || 10,
        populate: 'teams',
        sort: {'created_at': -1}

      }, function (err, managers) {
        console.log(err,managers);
        if (err) {
          console.log(errrr);
          result.sendServerError(cb);
        } else {
          result.sendSuccess(cb, managers);
        }
      });
    }
  }
}



