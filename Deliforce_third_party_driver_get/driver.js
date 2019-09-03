const result = require('./result');
const driverModel = require('./model').driverModel;
const helper = require('./util');
const constant = require('./constant')();
const isIt = constant.isIt;
const role = constant.ROLE;
const mongoose = require('mongoose');
const geolib = require('geolib');

module.exports = {
  getDrivers: (event, cb, principals) => {
    const data = helper.getQueryData(event);
    console.log( JSON.stringify(data) +  "hiiii consoling data here");
    if (!data) {
      result.invalidInput(cb);
    }
      if(typeof data.page[0] === 'string'){
          data.page[0] = Number(data.page[0]);
      }
      if(typeof data.limit[0] === 'string'){
          data.limit[0] = Number(data.limit[0]);
      }
      if(data.latitude && data.longitude ) {
        console.log('hello mate entering here');
          if (typeof data.latitude[0] === 'string') {
              data.latitude[0] = Number(data.latitude[0]);
          }
          if (typeof data.longitude[0] === 'string') {
              data.longitude[0] = Number(data.longitude[0]);
          }
      }


     // if(data.latitude[0] && data.longitude[0]) {
     //     data.filter = {};
     //      data.filter.distance =  {latitude:data.latitude[0],longitude:data.longitude[0]} // is the task location
     // }
   // data.filter = {};
   // data.filter.distance =  {latitude:12.9592,longitude:77.6974} // is the task location
    // let driverLocation = {
    //   latitude: driverData.location.coordinates[1], //12 //lat
    //   longitude: driverData.location.coordinates[0] // 77 //long
    // };

    formQuery(principals, data).then((finalQuery)=>{
      if (data.driverIds) {
        finalQuery.driverId = { $in: data.driverIds }
       // finalQuery.assignTeam = mongoose.Types.ObjectId(data.filter.teamsFilter);
      }
      if(data.driverStatus) {
          finalQuery.driverStatus =  data.driverStatus[0];
      }
      console.log('call paginate');
      console.log('query', finalQuery);
      driverModel.paginate(finalQuery, {
        page: data.page[0] || 1,
        limit: data.limit[0] || 10,
        sort: {'created_at': -1},
        populate: 'assignTeam'
      }, function (err, drivers) {
      //  console.log(err, JSON.stringify(drivers));
        if (err) {
          result.sendServerError(cb);
        } else {
         // drivers = drivers.toObject();
          var driverArray = drivers.docs;
          console.log('driver Arrray here !!!!!!!!!!!!!!!!' + JSON.stringify(driverArray));
            if (data.latitude && data.longitude) {
            let finalArry=[];
            let latlanArry=[];
            latlanArry = driverArray.map((t)=> {
              t = t.toObject();
              console.log(JSON.stringify(t) + 'this is ttttttttttt');
              return {latitude:t.location.coordinates[1],longitude:t.location.coordinates[0]}
            });
            console.log(JSON.stringify(latlanArry) + 'latlanarray')
            console.log(JSON.stringify(driverArray) + 'driverArrayhere')

            let orderArry= geolib.orderByDistance({latitude:data.latitude[0],longitude:data.longitude[0]},latlanArry);
            console.log(JSON.stringify(orderArry) + 'order array here');
            for(let i=0;i<orderArry.length;i++){
              finalArry.push(driverArray[Number(orderArry[i].key)]);
            }
         //   finalArry = finalArry[0].toObject();
            console.log(finalArry + 'goes here')
            var resultArray = [];
            for(i=0;i<finalArry.length;i++) {
              var distinct = finalArry[i].toObject();
             var distance = geolib.getDistanceSimple(
                 {latitude:data.latitude[0],longitude:data.longitude[0]},
                {latitude: distinct.location.coordinates[1], longitude: distinct.location.coordinates[0]}
              );
             distinct.distance = distance;
              resultArray.push(distinct);
            }
            result.sendSuccess(cb, JSON.stringify(resultArray));
          }

        else {
            result.sendSuccess(cb, JSON.stringify(drivers));
          }
        }
      });

    });
  }
};



function getDistanceLatLng(lat,lng) {
  return new Promise((resolve,reject)=> {

  });
}

function formQuery(principals, qryData) {
  return new Promise((resolve,reject)=> {
  const defaultQuery = {isDeleted: isIt.NO, role: role.DRIVER}; //add all default values here
  const query = defaultQuery;
  // if (qryData.filter && qryData.filter.search) {
  //   //TODO This should be optimised with common search & fields structure. ex: fields:['teamName','description']
  //   query.name = {$regex: `.*${qryData.filter.search}.*`, '$options': 'i'};
  // }

  // if (qryData.filter && qryData.filter.state) {
  //   //TODO This should be optimised with common search & fields structure. ex: fields:['teamName','description']
  //   query.driverStatus = qryData.filter.state;
  // }
  //add auth query
  // if (helper.isAdmin(principals)) {

    query['clientId'] = principals['sub'];

  // } else {
  //   query['user'] = {'$in': [principals['sub'],principals['clientId']]};
  //   var teams = principals['teams'];
  //   teams = teams.map((team) => {
  //     return mongoose.Types.ObjectId(team);
  //   });
  //   query['assignTeam'] = {'$in': teams};
  // }
  //console.log(JSON.stringify(query) + 'last line');
    resolve(query);
 // return query;
  })
}
