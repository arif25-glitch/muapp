const route = require('express').Router();
const {controller} = require('../controller/index');

// routing for user
route.get("/user-read-all", controller.user.read_all);
route.post("/user-create", controller.user.crud.create);
route.post("/user-read", controller.user.crud.read);
route.post("/user-update", controller.user.crud.update);

// routing for admin

// else routing
route.get("*", (req, res) => {
    res.json({"message": "no api here"});   
});
route.post("*", (req, res) => {
    res.json({"message": "no api here"});   
});

module.exports = route