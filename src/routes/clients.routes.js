const { Router } = require("express");
const routes = new Router();

const ClientController = require("../controllers/ClientController");

routes.post("/", ClientController.create);
routes.get("/", ClientController.list);
routes.put("/:clientId", ClientController.update);
routes.delete("/:clientId", ClientController.delete);

module.exports = routes;
