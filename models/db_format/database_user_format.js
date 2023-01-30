const {encrypt} = require('../data_encryption');

class format {
    constructor(email, username, password) {
        this._id = email;
        this.username = username;
        this.password = encrypt(password);
    }
}

module.exports = format;