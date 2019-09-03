const permissionModel = require('./model').permission;
module.exports.setPermission = (permissionObj, managerSub) => {
  const permissions = [];
  const principal = {principalId: managerSub, principalType: 2};
  if (permissionObj.allowCreateTask) {
    permissions.push(Object.assign({}, permissionMock.createTask, principal));
    permissions.push(Object.assign({}, permissionMock.taskImport, principal));

  }

  if (permissionObj.allowEditTask) {
    permissions.push(Object.assign({}, permissionMock.updateTask, principal));
  }

  if (permissionObj.allowAddDriver) {
    permissions.push(Object.assign({}, permissionMock.createDriver, principal));
    permissions.push(Object.assign({}, permissionMock.driverImport, principal));
  }

  if (permissionObj.allowAccessToUnassigned) {
    permissions.push(Object.assign({}, permissionMock.unassignedTask, principal));
  }

  //allowAccessToUnassigned

  if (permissions.length) {
    console.log(permissions);
    return permissionModel.insertMany(permissions);
  } else {
    console.log('no permission setted for user');
    return Promise.resolve();
  }

};

// for manager
const permissionMock = {
  createTask: {
    moduleAction: 'TASK.WRITE', grant: true
  },taskImport: {
    moduleAction: 'TASK.IMPORT.WRITE', grant: true
  },createDriver: {
    moduleAction: 'DRIVER.WRITE', grant: true
  }, driverImport: {
    moduleAction: 'DRIVER.IMPORT.WRITE', grant: true
  }, updateTask: {
    moduleAction: 'TASK.UPDATE', grant: true
  }, unassignedTask: {
    moduleAction: 'TASK.UNASSIGN', grant: true
  }
};
