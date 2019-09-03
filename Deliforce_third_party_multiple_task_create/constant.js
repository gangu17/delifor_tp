module.exports = {
  //common

  "TABLES": {
    "DRIVER": "users",
    "MANAGER": "users",
    "ADMIN": "users",
    "TEAM": "teams",
    "TASK": "tasks",
    "SETTING": "settings",
    "TASK_LOG": "tasklogs",
    "PERMISSION": "permissions",
    "CUSTOMER": "customers",
    "PREFERENCE": "preferences",
    "DRIVERLOG": "driverlogs",
    "USER": "users"
  },

  "DB": {
    "URL": "mongodb://vignesh:Vignesh123@cluster0-shard-00-00-6geto.mongodb.net:27017,cluster0-shard-00-01-6geto.mongodb.net:27017,cluster0-shard-00-02-6geto.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin",
    "POOL_SIZE": 2
  },

  "ROLE": {
    "ADMIN": 1,
    "MANAGER": 2,
    "DRIVER": 3
  },


  "isIt": {
    "YES": 1,
    "NO": 0
  },

  "BUSINESS_TYPE": {
    "PICKUP": 1,

    "APPOINTMENT": 2,
    "FIELD": 3
  },

  "TASK_STATUS": {
    "UNASSIGNED": 1,
    "ASSIGNED": 2,
    "ACCEPTED": 3,
    "STARTED": 4,
    "INPROGRESS": 5,
    "SUCCESS": 6,
    "FAIL": 7,
    "DECLINED": 8,
    "CANCELLED": 9
  },

  "DRIVER_STATUS": {
    "IDLE": 1,
    "IN_TRANSIT": 2,
    "OFFLINE": 3,
    "BLOCKED": 4,
    "FIRST_LOGIN": 0
  },

  "TASK_LOG_STATUS": {
    "CREATED": 0,
    "UNASSIGNED": 1,
    "ASSIGNED": 2,
    "ACCEPTED": 3,
    "STARTED": 4,
    "INPROGRESS": 5,
    "SUCCESS": 6,
    "FAIL": 7,
    "DECLINED": 8,
    "CANCELLED": 9,
    "UPDATED": 10,
    "DELETED": 11
  }

};
