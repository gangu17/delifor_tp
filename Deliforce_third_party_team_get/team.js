const result = require('./result');
const teamModel = require('./model');
const driverModel = require('./model').DRIVER;
const helper = require('./util');
const constant = require('./constant')();
const isIt = constant.isIt;
const objectID = require('mongoose').Types.ObjectId;
module.exports = {

    getAllTeams: (event, cb, principals) => {
        const data = helper.getQueryData(event);
        console.log(typeof data.page[0]);
        if(typeof data.page[0] === 'string'){
            data.page[0] = Number(data.page[0]);
        }
        if(typeof data.limit[0] === 'string'){
            data.limit[0] = Number(data.limit[0]);
        }
        console.log('data', JSON.stringify(data));
        const query = formTeamQuery(principals, data);
        if (data && data.teamIds) {
            query.teamId = {$in: data.teamIds}
        }
        teamModel.paginate(query, {
            page: data.page[0] || 1,
            limit: data.limit[0] || 10,
            sort: {'created_at': -1}
        }, function (err, teams) {
            if (err) {
                console.log(err);

                result.sendServerError(cb);
            } else {
                teamModel.aggregate([
                    {$match: {$and: [query]}},
                    {
                        $lookup:
                            {
                                from: 'users',
                                localField: '_id',
                                foreignField: 'assignTeam',
                                as: 'driverDetails'
                            }
                    }]).then((data) => {
                    for (var i = 0; i < data.length; i++) {
                        for (var j = 0; j < data[i].driverDetails.length; j++) {
                            if (data[i].driverDetails[j].isDeleted === 1) {
                                //console.log(data[i].taskDetails[j].date);
                                data[i].driverDetails.splice(j, 1);
                                j = (j = 0) ? 0 : j - 1;
                            }
                        }
                    }

                    const docs = data.reverse();
                    const result1 = Object.assign({}, {docs}, {
                        'total': teams.total,
                        'limit': teams.limit,
                        'page': teams.page,
                        'pages': teams.pages
                    });
                    let end = new Date()
                    result.sendSuccess(cb, result1);
                }).catch((error) => {
                    result.sendServerError(cb);

                });

            }
        });
    }
};


function formTeamQuery(principals, qryData) {
    const defaultQuery = {isDeleted: isIt.NO}; //add all default values here
    const query = defaultQuery;
    query['clientId'] = principals['sub'];
    return query;
}
