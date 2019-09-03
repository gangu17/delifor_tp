const result = require('./result');
const driverModel = require('./model').driverModel;
const helper = require('./util');
const constant = require('./constant')();
const mongoose = require('mongoose');
const isIt = constant.isIt;
const teamModel = require('./model').teamModel;

module.exports = {

  getDrivers: (event, cb, principals) => {
    //add auth query
    let data = helper.getQueryData(event);
    const clientId = principals['sub'];
    const query = [{'clientId': clientId, role: constant.ROLE.DRIVER}]

    // if (data.driverId) {
    //   query.push({'driverId': data.driverId})
    // }
    if (data.teamId) {
      query.push({'teamDetails.teamId': data.teamId});
    }
    driverModel.aggregate([
      {
        $lookup:
          {
            from: 'teams',
            localField: 'assignTeam',
            foreignField: '_id',
            as: 'teamDetails'
          }
      }, {$match: {$and: query}},
      {$unwind: {path: "$teamDetails"}},
      {
        $project: {
          role: 1, driverStatus: 1, isDeleted: 1, name: 1, lastName: 1,
          email: 1, phone: 1, password: 1, transportType: 1, transportDesc: 1, licencePlate: 1, driverId: 1,
          currentDetails: 1, created_at: 1, 'teamDetails.teamId': 1
        }
      }
    ], function (error, respone) {
      console.log('teamDetails' + JSON.stringify(respone));
      result.sendSuccess(cb, respone);
    })
  }
};

