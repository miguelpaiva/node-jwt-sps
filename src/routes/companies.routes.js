const { Router } = require("express");
const routes = new Router();

const CompanyController = require("../controllers/CompanyController");

routes.post("/", CompanyController.create);
routes.get("/", CompanyController.list);
routes.put("/:companyId", CompanyController.update);
routes.delete("/:companyId", CompanyController.delete);

module.exports = routes;
