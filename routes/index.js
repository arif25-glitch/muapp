const route = require('express').Router();
const {controller} = require('../controller/route_controller');

// routing for music
route.get("/api/music-play", controller.music.play);
route.get("/api/music-read", controller.music.read);
route.get("/api/music-list", controller.music.list);
route.get("/api/music-read-image", controller.music.readImage);

// routing for user
route.get("/api/user-read-all", controller.user.read_all);
route.get("/api/user-playlist", controller.user.playlist);
route.post("/api/user-create", controller.user.crud.create);
route.post("/api/user-read", controller.user.crud.read);
route.post("/api/user-update", controller.user.crud.update);
route.post("/api/user-delete", controller.user.crud.delete);

// routing for admin
route.post("/api/admin-music-create", controller.admin.crud.music.create);

// else routing
route.get("*", (req, res) => {
    res.json({"message": "no api here"});
});
route.post("*", (req, res) => {
    res.json({"message": "no api here"});   
});

module.exports = route;