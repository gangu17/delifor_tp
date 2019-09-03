const sgMail = require('@sendgrid/mail');
const constant = require('./constant')();
sgMail.setApiKey(constant.SENDGRID.API_KEY);

module.exports = {
  sendEmailToAdmin: sendEmailTo
};

function sendEmailTo(adminDetails, taskDetails, cb) {
  adminDetails = adminDetails.toObject();
  console.log(adminDetails.email);
  const msg = {
    to: adminDetails.email,
    from: 'support@deliforce.io',
    subject: 'Autoallocation failed - ' + taskDetails.taskId + '',
    html: 'Hi ' + adminDetails.name + ',<br><br>Your task auto allocation was failed due to drivers are offline/busy or drivers did not accept the task.<br><br>Please find the task information below:<br>Task Id: ' + taskDetails.taskId + '<br>customer Name: ' + taskDetails.name + ''
  };

  return new Promise((reslove, reject) => {
    sgMail.send(msg, (err, data) => {
      if (err) {
        console.log('send grid error', err);
        reslove();
        cb(null, 'errormessage');
        //process.exit(0);
      } else {
        console.log('sendgrid success');
        reslove();
        cb(null, 'errormessage');
        // process.exit(0);
      }
    });
  })
}
