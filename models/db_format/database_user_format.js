const {encrypt} = require('../data_encryption');

const format = {
    "_id": "0000",
    "username": "adam",
    "password": encrypt("adam")
};

module.exports = format;