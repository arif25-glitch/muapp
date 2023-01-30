class format {
    constructor (id, title, author, time, image_thumb, genres) {
        this._id = id;
        this.title = title;
        this.author = author;
        this.time = time;
        this.image_thumb = image_thumb;
        this.genres = genres;
    }
}

module.exports = format;