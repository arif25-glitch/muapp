const userFormat = require('../models/db_format/database_user_format');
const userPlaylistFormat = require('../models/db_format/database_user_playlist_format');
const generalPlaylistFormat = require('../models/db_format/database_general_playlist_format');
const spesificMusicFormat = require('../models/db_format/database_spesific_music');

var databaseName = "muapp";

const database = {
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
        }
    },
    admin: {

    }
}

module.exports = database;