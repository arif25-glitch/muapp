const CryptoJS = require('crypto-js');
const crypto = require('crypto');

const encrypt = (text) => {
    return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text));
}

const decrypt = (data) => {
    return CryptoJS.enc.Base64.parse(data).toString(CryptoJS.enc.Utf8);
}

const sha256 = (message) => {
    return crypto.createHash('sha256').update(message).digest('hex');
}

module.exports = {encrypt, decrypt, sha256};