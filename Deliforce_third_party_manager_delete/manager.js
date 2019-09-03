const constant = require('./constant')();
const role = constant.ROLE.MANAGER;
const principalType = constant.PRINCIPAL.USER;
const managerModel = require('./model').manager;
const cognito = require('./cognito');
const result = require('./result');
const helper = require('./util');
const permissionModel = require('./model').permission;
const mongoose = require('mongoose');

module.exports = {
  deleteManager: deleteManager
};


function deleteCognito(manager) {
  console.log(manager);
  return cognito.deleteUser(manager.email)
    .then(() => {
      return manager['cognitoSub'];
    }).catch((err) => {
      console.log('error in delete conginto User with UserName ' + manager.email);
      //handle user not deleted
      return Promise.reject({});
    });
}


function deletePermission(managerSub) {
  return permissionModel.findOneAndRemove({principalType: principalType, principalId: managerSub});
}

function fetchManager(data, clientId, cb) {
  const managerId = data['managerId'];
  return managerModel.findOne({managerId: managerId, clientId: clientId, role}).then((manager) => {
    if (!manager) {
      console.log('manager not found for given id');
      result.invalidInput(cb);
      return Promise.reject({sentResponse: true});
    }
    return manager;
  });
}


function deleteUser(data, cb, clientId) {
  const managerId = data['managerId'];
  return managerModel.update({managerId: managerId, clientId: clientId, role: role}, {isDeleted: 1}, {
    multi: false,
    runValidators: true
  })
    .then((response) => {
      console.log(response);
      result.sendSuccess(cb, response);
    })
}

function deleteManager(event, cb, principal) {
  const data = helper.getQueryData(event);
  if (!data) {
    result.invalidInput(cb);
    return
  }

  console.log(data);
  const clientId = principal.sub;

  fetchManager(data, clientId, cb)
    .then((manager) => deleteCognito(manager))
    .then((managerSub) => deletePermission(managerSub))
    .then(() => deleteUser(data, cb, clientId))
    .catch((err) => {
      console.log(err);
      if (!err.sentResponse) {
        result.sendServerError(cb);
      }
    })
}



function managerError(err, cb) {
  const errors = err.errors;
  if (errors && errors.teams) {
    result.sendTeamMandatory(cb)
  } else {
    result.sendServerError(cb);
  }
}



