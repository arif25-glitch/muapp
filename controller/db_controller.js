// formats
const userFormat = require('../models/db_format/database_user_format');
const userPlaylistFormat = require('../models/db_format/database_user_playlist_format');
const generalPlaylistFormat = require('../models/db_format/database_general_playlist_format');

// mobile security
const SecureCrypto = require('../models/data_encryption');

// miscellaneous
const stringSimilarity = require('string-similarity');

// database
var databaseName = "muapp";

const database = {
    music: {
        search: async(connection, searchText) => {
            if (connection == null) return console.log("Cannot connect to database");

            let data = await connection.db(databaseName).collection("general-playlist").find({}).toArray();

            title = data.map(x => {
                return x['title']
            });

            results = [];
            for (let i = 0; i < title.length; i++) {
                results.push({
                    qVal: stringSimilarity.compareTwoStrings(searchText, title[i]),
                    data: data[i]
                });

            }

            results.sort((a, b) => {
                if (a.qVal < b.qVal) {
                    return -1;
                }
                if (a.qVal > b.qVal) {
                    return 1;
                }
                return 0;
            }).reverse();

            results = results.map(x => {
                return x.data;
            });

            return {
                // 'title': data[results.indexOf(Math.max(...results))]
                'results': results.slice(0, 3)
            };
        },
        readAll: async (connection, page) => {
            if (connection == null) return console.log("Connect first to database");

            let dataLimitInPage = 2;

            if (page) {
                if ((page - 1) < 0) return {"message": "out of page"};

                let startIndex = (page - 1) * dataLimitInPage;
                let endIndex = page * dataLimitInPage;

                let result = await connection.db(databaseName).collection("general-playlist").find({}).skip(startIndex).limit(dataLimitInPage).toArray();
            
                if (!(result.length > 0)) {
                    result = {"message": "out of page"};
                }

                if (result) return result;
                else return false;
            } else {
                let result = await connection.db(databaseName).collection("general-playlist").find({}).toArray();
            
                if (result) return result;
                else return false;
            }

        },
        read: async (connection, musicId) => {
            if (connection == null) return console.log("Connect first to database");
            
            let result = await connection.db(databaseName).collection("general-playlist").findOne({"_id": musicId});
            
            if (result) {
                return result;
            } else {
                return false;
            }
        },
    },
    user: {
        create: async (connection, username, email, password) => {
            if (connection == null) return console.log("Connect first to database");
        
            let result = false;
            let format = new userFormat(email, username, password);
        
            await connection.db(databaseName).collection("user").insertOne(format)
            .then(() => {
                result = true;
            })
            .catch((err) => {
                result = false;
            })
        
            return result;
        },
        read: async (connection, email) => {
            if (connection == null) return console.log("Connect first to database");
        
            let result = await connection.db(databaseName).collection("user").findOne({"_id": email});
        
            if (result) {
                return result;
            } else {
                return false;
            }
        },
        readAll: async (connection) => {
            if (connection == null) return console.log("Connect first to database");
        
            // let result = await connection.db(databaseName).collection("user").find({}).limit(5).toArray();
            let result = await connection.db(databaseName).collection("user").find({}).toArray();
        
            if (result) return result;
            else return false;
        },
        update: async (connection, email, newUsername, newPassword) => {
            if (connection == null) return console.log("Connect first to database");
            
            let result = false;
            let newFormat = new userFormat(email, newUsername, newPassword);

            await connection.db(databaseName).collection("user").updateOne({
                _id: newFormat._id
            },
            {$set: newFormat})
            .then((tempResult) => {
                if (tempResult) {
                    result = true;
                }
            })
        
            return result;
        },
        delete: async (connection, email) => {
            if (connection == null) return console.log("Connect first to database");

            let result = false;

            await connection.db(databaseName).collection("user").deleteOne({
                _id: email
            })
            .then((tempResult) => {
                if (tempResult) {
                    result = true;
                }
            });
            
            return result;
        },
        validate: async (connection, email, password) => {
            if (connection == null ) return console.log("Connect first to database");

            let data = await connection.db(databaseName).collection("user").findOne({"_id": email});

            if (!data) return false;
            if (SecureCrypto.decrypt(data.password) == password) return true;

            return false;
        },
        playlist: {
            read: async (connection, email, page) => {
                if (connection == null) return console.log("Database not connected");
                
                dataLimitPage = 5;

                if (page) {
                    let userData = await connection.db(databaseName).collection("user").findOne({"_id": email});

                    
                } else {

                }

                return {"msg": "ok"};
            }
        }
    },
    admin: {
        musicCreate: async (connection, title, author, time, image, genres, musicFile) => {
            if (connection == null) return console.log("Connect first to database");
            
            let result = false;
            let format = new generalPlaylistFormat(musicFile.name, title, author, time, image.name, genres);

            musicFile.mv("./public/musics/" + format._id + ".mp3", (err) => {
                if(err) console.log(err);
            });
            image.mv("./public/images/" + format.image_thumb + ".jpg", (err) => {
                if(err) console.log(err);
            });

            await connection.db(databaseName).collection("general-playlist").insertOne(format)
            .then(() => {
                result = true;
            })
            .catch((err) => {
                result = false;
            })
        
            return result;
        }
    }
}

module.exports = database;