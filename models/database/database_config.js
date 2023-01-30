const { MongoClient, ServerApiVersion } = require('mongodb');

const db_controller = require('../../controller/db_controller');

const createDBConnection = () => {
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

const createUserAccount = db_controller.user.create;
const readUserAccount = db_controller.user.read;
const readAllUserAccount = db_controller.user.readAll;
const updateUserAccount = db_controller.user.update;

module.exports = { 
    createDBConnection, 
    
    createUserAccount, 
    readUserAccount,
    readAllUserAccount,
    updateUserAccount
};