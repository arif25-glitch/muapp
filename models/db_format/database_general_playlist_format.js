const {sha256} = require('../data_encryption');

class format {
    constructor (id, title, author, time, image_thumb, genres) {
        this._id = sha256(id);
        this.title = title;
        this.author = author;
        this.time = time;
        this.image_thumb = sha256(image_thumb);
        this.genres = genres;
    }
}

module.exports = format;