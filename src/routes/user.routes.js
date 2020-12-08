const { Router } = require("express");
const routes = new Router();

const UserController = require("../controllers/UserController");

routes.post("/", UserController.create);
routes.get("/", UserController.list);

module.exports = routes;
