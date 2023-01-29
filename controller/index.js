const database = require('../models/database/database_config');

database.createDatabaeConnection();

const controller = {
    user: {
        read_all: async (req, res) => {
            database.readAllUserAccount().then((result) => {
                if (result) res.json(result);
                else res.json({"message": "no data available"});
            })
        },
        crud: {
            create: async (req, res) => {
                if ((req.body.email == null || req.body.username == null || req.body.password == null)) return res.json({"message": "data is not completed"});
            
                database.insertNewUserAccount(req.body.username, req.body.email, req.body.password)
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
            
                database.readUserAccount(req.body.email)
                .then((result) => {
                    if (result) {
                        res.json(result);
                    } else {
                        res.json({"message": "cannot found any existing data"});
                    }
                })
            }
        }
    },
    admin: {

    }
};

module.exports = controller;