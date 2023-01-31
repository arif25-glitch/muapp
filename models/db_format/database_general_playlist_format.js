const {sha256} = require('../data_encryption');

class format {
    constructor (title, author, time, image_thumb, genres) {
        this._id = sha256(title);
        this.title = title;
        this.author = author;
        this.time = time;
        this.image_thumb = sha256(image_thumb);
        this.genres = genres;
    }
}

module.exports = format;