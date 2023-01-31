const database = require('../models/database/database_config');

const connection = database.createDBConnection();

const controller = {
    music: {
        play: async (req, res) => {
            if (req.query.music_id == null) return res.json({"message": "music_id needed"});
            res.statusCode = 302;
            res.setHeader("Location", `../musics/${req.query.music_id}.mp3`); // for vercel
            // res.setHeader("Location", `./musics/${req.query.music_id}.mp3`); // for localhost
            res.end();
        },
        read: async (req, res) => {
            let musicId = req.query.music_id;

            if (musicId == null) return res.json({"message": "music_id needed"});
            
            database.musicRead(connection, musicId)
            .then((result) => {
                if (result) {
                    res.json(result);
                } else {
                    res.json({"message": "cannot found any existing data"});
                }
            })
        },
        list: async (req, res) => {
            database.musicReadList(connection, 1).then((result) => {
                if (result) res.json(result);
                else res.json({"message": "no data available"});
            })
        },
        readImage: async (req, res) => {
            if (req.query.image_id == null) return res.json({"message": "image_id needed"});
            res.statusCode = 302;
            res.setHeader("Location", `images/${req.query.image_id}.jpg`);
            res.end();
        }
    },
    user: {
        playlist: async (req, res) => {
            console.log(req.query.email);
        },
        read_all: async (req, res) => {
            database.readAllUserAccount(connection).then((result) => {
                if (result) res.json(result);
                else res.json({"message": "no data available"});
            })
        },
        crud: {
            create: async (req, res) => {
                if ((req.body.email == null || req.body.username == null || req.body.password == null)) return res.json({"message": "data is not completed"});
            
                database.createUserAccount(connection, req.body.username, req.body.email, req.body.password)
                .then((result) => {
                    if (result) {
                        res.json({"message": "input successfully"});
                    } else {
                        res.json({"message": "account already registered"});
                    }
                })
            },
            read: async (req, res) => {
                if (req.body.email == null) return res.json({"message": "params is not completed"});
            
                database.readUserAccount(connection, req.body.email)
                .then((result) => {
                    if (result) {
                        res.json(result);
                    } else {
                        res.json({"message": "cannot found any existing data"});
                    }
                })
            },
            update: async (req, res) => {
                let email = req.body.email;
                let newUsername = req.body.newUsername;
                let newPassword = req.body.newPassword;

                if ((req.body.email == null || req.body.newUsername == null || req.body.newPassword == null)) return res.json({"message": "data is not completed"});

                database.updateUserAccount(connection, email, newUsername, newPassword)
                .then((result) => {
                    if (result) {
                        res.json({"message": "update successfully"});
                    } else {
                        res.json({"message": "there is something error"});
                    }
                })
            },
            delete: async (req, res) => {
                if (req.body.email == null) return res.json({"message": "data is not completed"});

                database.deleteUserAccount(connection, req.body.email)
                .then((result) => {
                    if (result) {
                        res.json({"message": "delete successfully"});
                    } else {
                        res.json({"message": "there is something error"});
                    }
                })
            }
        }
    },
    admin: {
        crud: {
            music: {
                create: async (req, res) => {
                    let musicFile;
                    let image;

                    let title = req.body.title;
                    let author = req.body.author;
                    let time = req.body.time;
                    let genre = req.body.genre;
                    
                    if(req.files){
                        musicFile = req.files.music;
                        image = req.files.image;
                    } else {
                        console.log("err");
                    }
                    
                    if (title == null || author == null || time == null || image == null || genre == null || musicFile == null) return res.json({"message": "data is not completed"});

                    database.adminCreateMusic(connection,
                        title,
                        author,
                        time,
                        image,
                        genre,
                        musicFile)
                    .then((result) => {
                        if (result) {
                            res.json({"message": "input successfully"});
                        } else {
                            res.json({"message": "something wrong was captured"});
                        }
                    });
                }
            }
        }
    }
};

module.exports = {controller};