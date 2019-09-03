module.exports = {
  "driverData": [
    {
      "endArn": "arn:aws:sns:ap-south-1:204006638324:endpoint/APNS_SANDBOX/Deliforce_iOS/14e0c489-9d16-33cf-b07b-8b3005682823",
      "driverId": "5c0fa0b542b6ed5ea5796606"
    }
  ],
  "taskId": "5c19fc2479130739d8e77876",
  "autoAllocation": {
    "nearest": {
      "radius": 16,
      "current": false,
      "expiry": 30,
      "retries": 10
    },
    "sendToAll": {
      "radius": 10,
      "current": false,
      "expiry": 30,
      "retries": 10
    },
    "oneByOne": {
      "radius": 200000,
      "expiry": 30,
      "current": true,
      "retries": 10
    }
  }
}
