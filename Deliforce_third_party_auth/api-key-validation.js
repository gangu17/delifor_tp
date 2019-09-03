const crypto = require('crypto');
const ENCRYPTION_KEY = 'Must256bytes(32characters)secret';
const SALT = 'somethingrandom';
const IV_LENGTH = 16;
const NONCE_LENGTH = 10; // Gives us 8-character Base64 output. The higher this number, the better
let key = crypto.pbkdf2Sync(ENCRYPTION_KEY, SALT, 10000, 32, 'sha512');
const userModel = require('./model');

module.exports = {


  checkApiKey: (event, cb) => {

    return new Promise((resolve, reject) => {


      console.log(JSON.stringify(event));
      const apiKey = event.authorizationToken;

      if (!apiKey) {
        reject('no key');
      }

      console.log('apiKeys:' + apiKey);
      let clientId = decrypt(key, apiKey);
      console.log('clientId:' + clientId)
      console.log('apikey:', apiKey)


      userModel.findOne({cognitoSub: clientId, apiKeys: {'$in': [apiKey]}}, (err, user) => {
        console.log('user++++++++++++++', user);
        if (!err) {
            if(user !== null) {
                console.log('user', JSON.stringify(user));
                resolve(user.toObject().cognitoSub);
            }
            else {
                reject();
            }
        } else {
          reject();
        }
      });


    });
  }

};


function decrypt(key, text) {
  text = text.replace(/aFaFa/g, '+' ).replace(/bFbFb/g, '/').replace(/cFcFc/g, '=');
  let message = Buffer.from(text, 'base64')
  let iv = Buffer.alloc(IV_LENGTH)
  message.copy(iv, 0, 0, NONCE_LENGTH)
  let encryptedText = message.slice(NONCE_LENGTH)
  let decipher = crypto.createDecipheriv('aes-256-ctr', key, iv);
  let decrypted = decipher.update(encryptedText);
  try {
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  } catch (Err) {
    return 'NULL';
  }
}
