const {sha256} = require('../data_encryption');

class format {
    constructor (id, image, lyrics, url) {
        this._id = id;
        this.image = sha256(image);
        this.lyrics = lyrics;
        this.url = url;
    }
}

module.exports = format;