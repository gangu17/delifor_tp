// const AWS = require('aws-sdk');
// const constant = require('./constant')().AWS;
// AWS.config.update({region: constant.region});
// const options = {apiVersion: '2016-04-18', accessKeyId: constant.accessKeyId, secretAccessKey: constant.secretAccessKey}
// const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider(options);
//
//
// module.exports = {
//     updateUser: function (user, userName) {
//         console.log('user', JSON.stringify(user));
//         console.log('userName', JSON.stringify(userName));
//         return new Promise((resolve, reject) => {
//
//             // Define User Attributes ******
//             const attributeList = [];
//
//             if (user.name) {
//                 const dataName = {
//                     "Name": 'name',
//                     "Value": user.name
//                 };
//                 attributeList.push(dataName)
//             }
//
//             if (user.email) {
//                 const dataEmail = {
//                     "Name": "email",
//                     "Value": user.email
//                 };
//                 attributeList.push(dataEmail)
//             }
//
//             if (userName) {
//                 const dataPhone = {
//                     "Name": 'phone_number',
//                     "Value": userName.replace(' ', '')
//                 };
//                 attributeList.push(dataPhone);
//             }
//
//
//             //TODO we cannot reset password find how to handle this scenario
//             /*if(user.password){
//               const dataPassword = {
//                 "Name": 'password',
//                 "Value":user.password
//               };
//               attributeList.push(dataPassword);
//             }*/
//
//             console.log(attributeList);
//             var params = {
//                 UserAttributes: attributeList,
//                 UserPoolId: constant['userPoolId'], /* required */
//                 Username: userName.replace(' ', '') /* required */
//             };
//             cognitoidentityserviceprovider.adminUpdateUserAttributes(params, function (err, data) {
//                 if (err) reject(err); // an error occurred
//                 else resolve();           // successful response
//             });
//
//         });
//     }
// };

const AWS = require('aws-sdk');
const constant = require('./constant')().AWS;
AWS.config.update({region: constant.region});
const options = {apiVersion: '2016-04-18', accessKeyId: constant.accessKeyId, secretAccessKey: constant.secretAccessKey}
const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider(options);


module.exports = {
    updateUser: function (user, userName) {
        return new Promise((resolve, reject) => {
            console.log('user', JSON.stringify(user));
       console.log('userName', JSON.stringify(userName));
            // Define User Attributes ******
            const attributeList = [];

            if (user.name) {
                const dataName = {
                    "Name": 'name',
                    "Value": user.name
                };
                attributeList.push(dataName)
            }

            if (user.email) {
                const dataEmail = {
                    "Name": 'email',
                    "Value": user.email
                };

                const dataEmailVerify = {
                    "Name": 'email_verified',
                    "Value": 'true'
                };
                attributeList.push(dataEmail, dataEmailVerify)
            }

            if (user.phone) {
                const dataPhone = {
                    "Name": 'phone_number',
                    "Value": user.phone.replace(' ', '')
                };

                const dataPhoneVerify = {
                    "Name": 'phone_number_verified',
                    "Value": 'true'
                };

                attributeList.push(dataPhone, dataPhoneVerify);
            }


            //TODO we cannot reset password find how to handle this scenario
            /*if(user.password){
              const dataPassword = {
                "Name": 'password',
                "Value":user.password
              };
              attributeList.push(dataPassword);
            }*/


            var params = {
                UserAttributes: attributeList,
                UserPoolId: constant['userPoolId'], /* required */
                // Username: userName /* required */
                Username: userName.replace(' ', '')
               // Username: '+918866252893'
            };
            cognitoidentityserviceprovider.adminUpdateUserAttributes(params, function (err, data) {
                if (err) reject(err); // an error occurred
                else resolve();           // successful response
            });

        });
    }
};
