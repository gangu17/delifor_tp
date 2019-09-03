const constant = require('./constant')();
const isIt = constant.isIt;
const managerModel = require('./model').manager;
const teamModel = require('./model').team;
const cognito = require('./cognito');
const result = require('./result');
const helper = require('./util');
const permission = require('./permission');
const notify = require('./notify');
var securePin = require("secure-pin");

module.exports = {
  createManager: checkDuplicate
};


function checkDuplicate(cb, event, principals) {
  const data = helper.getBodyData(event);
  const clientId = principals.sub;
  if (!data) {
    result.invalidInput(cb);
    return
  }


  //addManager(data, cb, clientId);
  managerModel.findOne({"$or": [{email: data.email}, {phone: data.phone}], isDeleted: isIt.NO}, (err, manager) => {
    if (err) {
      result.sendServerError(cb)
    } else if (manager) {
      sendDuplicate(manager);
    } else {
      validateManagerData(data, cb, clientId);

    }
  });


  function sendDuplicate(manager) {
      if (manager.email === data.email && manager.phone === data.phone) {
          result.sendDuplicateEmailPhone(cb);
      }else if (manager.email === data.email) {
      result.sendDuplicateEmail(cb);
    } else {
      result.sendDuplicatePhone(cb);
    }
  }
}


//before create cognito user do validate
function validateManagerData(data, cb, clientId) {

  if (!data.teams || !data.teams.length) {
    result.sendTeamMandatory(cb);
  }

  teamModel.find({teamId:{ $in: data.teams }}).then((response) => {
    console.log('response', JSON.stringify(response));
    let teamArray = [];
    response.forEach((ele) => {
      console.log('ele', JSON.stringify(ele));
      ele = (ele) ? ele.toObject() : null;
      teamArray.push(ele._id);
    })
    data.teams = teamArray;
    console.log('data', JSON.stringify(data));
    const testData = Object.assign({}, data, {clientId: clientId, cognitoSub: '23232332'});
    const adminData = new managerModel(testData);

    adminData.validate((err) => {
      if (err) {
        managerError(err, cb);
      } else {
        cognitoManager(data, cb, clientId);
      }
    })
  });


}

function cognitoManager(data, cb, clientId) {
  cognito.createUser(data).then((cognitoUser) => {
    if (!cognitoUser.User.Username) {
      return new Error('user not created');
    } else {
      addManager(clientId, data, cognitoUser.User.Username, cb);
    }
  }).catch((err) => sendCognitoError(err, cb));
}

function addManager(clientId, data, cognitoSub, cb) {
  const mangerData = Object.assign({}, data, {
    clientId: clientId,
    cognitoSub: cognitoSub,
    managerId : securePin.generatePinSync(8)
  });

  const manager = new managerModel(mangerData);
  return manager.save().then((manager) => {
    console.log('Db manager', manager);
    let managerData= manager;
    return Promise.all([setPermission(data, cognitoSub, manager, cb), sendSms(manager)])
      .then(()=>{
        result.sendSuccess(cb,{data:managerData});
      })
  }).catch((err) => managerError(err, cb));
}

function sendSms(manager) {
  console.log('Managerdata++++',manager);
  return managerModel.findOne({cognitoSub: manager.clientId}).then((admin) => {
    console.log('adminData'+admin);
    return notify.call(manager._doc, admin._doc);
  }).catch((error) => {
    console.log(error);
  })
}


function managerError(error, cb) {
  const err = error.errors;
  if (!err) {
    result.sendServerError(cb);
  } else {
    if (err.email) {
      result.sendEmailInvalid(cb);
    }
    else if (err.name) {
      result.sendNameInvalid(cb);
    }
    else if (err.phone) {
      result.sendPhoneInvalid(cb);
    }
    else if (err.password) {
      result.sendPasswordInvalid(cb);
    } else if (err.teams) {
      result.sendTeamMandatory(cb)
    } else {
      console.log(err);
      result.invalidInput(cb);
    }
  }
}

function setPermission(data, cognitoSub, manager, cb) {
  console.log('peremision called');
  return permission.setPermission(data.permissions, cognitoSub);

}


function sendCognitoError(err, cb) {
  console.log('cognito error', err);
  const cognito = constant.COGNITO_ERROR;
  if (err.code === cognito.PASSWORD_INVALID) {
    result.sendPasswordInvalid(cb);
  } else if (err.code === cognito.EMAIL_EXIST) {
    result.sendDuplicateEmail(cb);
  } else if (err.code === cognito.INVALID_DATA) {
    (err.message === cognito.INVALID_EMAIL) ? result.sendEmailInvalid(cb): result.sendPhoneInvalid(cb);
  } else {
    result.sendServerError(cb);
  }
}
