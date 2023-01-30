const database = require('../models/database/database_config');

const connection = database.createDBConnection();

const controller = {
    user: {
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
            }
        }
    },
    admin: {

    }
};

module.exports = {controller};