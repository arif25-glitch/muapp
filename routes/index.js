const route = require('express').Router();
const {controller} = require('../controller/route_controller');

// routing for music
route.get("/music-play", controller.music.play);
route.get("/music-read", controller.music.read);
route.get("/music-list", controller.music.list);
route.get("/music-read-image", controller.music.readImage);

// routing for user
route.get("/user-read-all", controller.user.read_all);
route.get("/user-playlist", controller.user.playlist);
route.post("/user-create", controller.user.crud.create);
route.post("/user-read", controller.user.crud.read);
route.post("/user-update", controller.user.crud.update);
route.post("/user-delete", controller.user.crud.delete);

// routing for admin
route.post("/admin-music-create", controller.admin.crud.music.create);

// else routing
// route.get("*", (req, res) => {
//     res.json({"message": "no api here"});
// });
// route.post("*", (req, res) => {
//     res.json({"message": "no api here"});   
// });

module.exports = route;