const { MongoClient, ServerApiVersion } = require('mongodb');

const db_controller = require('../../controller/db_controller');

const createDBConnection = async () => {
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

    return client;
}

// user
const createUserAccount = db_controller.user.create;
const readUserAccount = db_controller.user.read;
const readAllUserAccount = db_controller.user.readAll;
const updateUserAccount = db_controller.user.update;
const deleteUserAccount = db_controller.user.delete;
const validateUserAccount = db_controller.user.validate;
// user playlist
const readUserPlaylistAccount = db_controller.user.playlist.read;

// admin
const adminCreateMusic = db_controller.admin.musicCreate;

// music
const musicRead = db_controller.music.read;
const musicReadList = db_controller.music.readAll;
const musicSearch = db_controller.music.search;

module.exports = { 
    createDBConnection, 

    musicRead,
    musicReadList,
    musicSearch,
    
    createUserAccount, 
    readUserAccount,
    readAllUserAccount,
    updateUserAccount,
    deleteUserAccount,
    validateUserAccount,

    readUserPlaylistAccount,

    adminCreateMusic,
};