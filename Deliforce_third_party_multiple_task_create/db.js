const mongoose = require('mongoose');
//const constant = require('./constant')();
const DB = {
  //"URL": "mongodb://vignesh:Vignesh123@cluster0-shard-00-00-6geto.mongodb.net:27017,cluster0-shard-00-01-6geto.mongodb.net:27017,cluster0-shard-00-02-6geto.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin",
  "URL": "mongodb://vignesh:Vignesh123@cluster0-shard-00-00-6geto.mongodb.net:27017,cluster0-shard-00-01-6geto.mongodb.net:27017,cluster0-shard-00-02-6geto.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin",

  "POOL_SIZE": 2
}
module.exports = {
  connect: () => {
    console.log('connection state++ ', mongoose.connection.readyState);
    if (mongoose.connection && mongoose.connection.readyState === 1) {
      console.log('connection reused');
      return Promise.resolve();
    } else {
      console.log('connection created once again');
      return mongoose.connect(DB.URL, DB.OPTION);
    }
  }
};
