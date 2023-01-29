const { MongoClient, ServerApiVersion } = require('mongodb');
const dataEncryption = require('../data_encryption');

const userFormat = require('../db_format/database_user_format');
const userPlaylistFormat = require('../db_format/database_user_playlist_format');
const generalPlaylistFormat = require('../db_format/database_general_playlist_format');
const spesificMusicFormat = require('../db_format/database_spesific_music');

var myClient = null;

var databaseName = "muapp";

const createDatabaeConnection = async () => {
    const password = 'wUfpxbIxnhyfUrnR';

    const uri = `mongodb+srv://aDm1n-use:${password}@mu-app.tt1c6tj.mongodb.net/?retryWrites=true&w=majority`;
    const client = new MongoClient(uri, 
        { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    
    client.connect()
    .then((res) => {
        console.log('database connected');
    })
    .catch((err) => {
        console.log('database error connection ' + err);
    });

    myClient = client;
}

const insertNewUserAccount = async (username, email, password) => {
    if (myClient == null) return console.log("Connect first to database");

    let result = false;
    let format = userFormat;

    format._id = email;
    format.username = username;
    format.password = dataEncryption.encrypt(password);

    await myClient.db(databaseName).collection("user").insertOne(format)
    .then(() => {
        result = true;
    })
    .catch((err) => {
        result = false;
    })

    return result;
}

const readUserAccount = async (email) => {
    if (myClient == null) return console.log("Connect first to database");

    let result = await myClient.db(databaseName).collection("user").findOne({"_id": email});

    if (result) {
        return result;
    } else {
        return false;
    }
}

const readAllUserAccount = async () => {
    if (myClient == null) return console.log("Connect first to database");

    let result = await myClient.db(databaseName).collection("user").find({}).toArray();

    if (result) return result;
    else return false;
}

module.exports = { 
    createDatabaeConnection, 
    insertNewUserAccount, 
    readUserAccount,
    readAllUserAccount
};