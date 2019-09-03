const result = require('./result');
const customerModel = require('./model');
const helper = require('./util');
const constant = require('./constant')();
const geocoder = require('geocoder');
const googleMapKey = constant.GOOGLEMAP;
const apiKey = {key: googleMapKey.GOOGLEMAP_APIKEY};
const _ = require('lodash');
const mongoose = require('mongoose');
const securePin = require("secure-pin");

module.exports = {
    editCustomer: (event, cb, principals) => {
        const clientId = principals.sub;
        if (!clientId) {
            result.sendUnAuth(cb);
        }
        const data = helper.getBodyData(event);
        console.log('dataaaaaaaaaaaa', JSON.stringify(data));
        if (!data) {
            result.invalidInput(cb);
        }
        if (data.address) {
            geoCoder(data).then((address) =>{
                console.log(JSON.stringify(address));
                if (!address.formatted_address.length) {
                    return result.invalidAddress(cb);
                } else {
                    data.address = {
                        'formatted_address': address.formatted_address,
                        'geometry': address.geometry
                    };
                    let customer = {};
                    customer.clientId = clientId;
                    customer.name = data.name;
                    customer.email = data.email;
                    customer.phone = data.phone;
                    customer.address = data.address;
                    customer.customerId = securePin.generatePinSync(8);

                    customerModel.findOne({phone: data.phone}).then((cus) =>{
                        if(!_.isEmpty(cus)){
                            cus = cus.toObject();
                            customerModel.update({_id:mongoose.Types.ObjectId(cus._id)}, customer).then((data) =>{
                                result.sendSuccess(cb, data);
                            })
                        }else{
                            const newCustomer = new customerModel(customer);
                            newCustomer.save().then((data) =>{
                                result.sendSuccess(cb, data);
                            })
                        }
                    }).catch((error, cb) => {
                        handlerError(error, cb)
                    });
                }
            });
        } else {
            result.addressRequired(cb);
        }
    }
};

function handlerError(error, cb) {
    const err = error.errors;
    if (err.name) {
        result.invalidName(cb);
    }
    else if (err.phone) {
        result.invalidPhone(cb);
    }
    else if (err.email) {
        result.invalidEmail(cb);
    }
    else if (err.address) {
        result.invalidAddress(cb);
    }
    else {
        result.sendServerError(cb);
    }
}

function geoCoder(data) {
    return new Promise((resolve, reject) => {
        console.log('gocode', data);
        console.log('gocode', data.latitude);
        if (data.latitude && data.longitude) {
            return resolve({
                'formatted_address': data.address,
                'geometry': {"location": {"lat": Number(data.latitude), "lng": Number(data.longitude)}}
            });
        } else {
            geocoder.geocode(data.address, (err, address) => {
                if (err || !address.results.length) {
                    return reject({message: 'address is invalid'});
                } else {
                    return resolve({
                        'formatted_address': data.address,
                        'geometry': address.results[0].geometry
                    });
                }
            }, apiKey);
        }
    });
}
