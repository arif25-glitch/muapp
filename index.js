const express = require('express');
const database = require('./models/database_config');
const http = require('http');

const app = express();
const server = http.createServer(app);

app.use(express.static('public'));
app.use(express.json({limit: "1mb"}));

const port = process.env.PORT || 3000;

server.listen(port, () => console.log(`Listening to port ${port}`));
database.createDatabaeConnection();

app.post("/register_user", (req, res) => {
    if ((req.body.email == null || req.body.username == null || req.body.password == null)) return res.json({"message": "data is not completed"});

    database.insertNewUserAccount(req.body.username, req.body.email, req.body.password)
    .then((result) => {
        if (result) {
            res.json({"message": "input successfully"});
        } else {
            res.json({"message": "account already registered"});
        }
    })
});

app.post("/read_user", (req, res) => {
    if (req.body.email == null) return res.json({"message": "params is not completed"});

    database.readUserAccount(req.body.email)
    .then((result) => {
        if (result) {
            res.json(result);
        } else {
            res.json({"message": "cannot found any existing data"});
        }
    })
});

app.get("*", (req, res) => {
    res.json({"message": "no api here"});   
});
app.post("*", (req, res) => {
    res.json({"message": "no api here"});   
});