const database = require('../models/database/database_config');

let connection = null
database.createDBConnection()
.then((result) => {
    connection = result;
})

const controller = {
    music: {
        search: async(req, res) => {
            let search = req.params.search;
            
            database.musicSearch(connection, search).then((result) => {
                if (result) {
                    res.json(result);
                } else {
                    res.json({
                        "message": "cannot find music"
                    });
                }
            });
        },
        play: async (req, res) => {
            if (req.query.music_id == null) return res.json({"message": "music_id needed"});
            res.statusCode = 302;
            res.setHeader("Location", `../musics/${req.query.music_id}.mp3`); // for vercel
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
            let page = req.params.page;

            database.musicReadList(connection, page).then((result) => {
                if (result) res.json(result);
                else res.json({"message": "no data available"});
            })
        },
        readImage: async (req, res) => {
            if (req.query.image_id == null) return res.json({"message": "image_id needed"});
            res.statusCode = 302;
            res.setHeader("Location", `../images/${req.query.image_id}.jpg`);
            res.end();
        }
    },
    user: {
        playlist: {
            read: async (req, res) => {
                let page = req.params.page;
                let email = req.query.email;

                if (email == null) return res.json({"message": "need email!"});

                database.readUserPlaylistAccount(connection, email, page)
                .then((result) => {
                    if (result) res.json(result);
                    else res.json({"message": "no data available"});
                });
            },
            create: async (req, res) => {

            },
            update: async (req, res) => {

            },
            delete: async (req, res) => {
                
            }
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
        },
        validate: async (req, res) => {
            let email = req.body.email;
            let password = req.body.password;

            if (email == null || password == null) return {"message": "email or password cannot be empty"};

            database.validateUserAccount(connection, email, password)
            .then((result) => {
                if (result) res.json({"status": true});
                else res.json({"status": false});
            });
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