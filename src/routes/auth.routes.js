const { Router } = require("express");
const routes = new Router();

const AuthTokenMiddleware = require("../middlewares/AuthToken.middleware");
const AuthCompaniesMiddleware = require("../middlewares/AuthCompanies.middleware");

const AuthController = require("../controllers/AuthController");

routes.post("/", AuthController.loginAuthToken);
routes.get(
  "/companyToken/:companyId",
  AuthTokenMiddleware,
  AuthCompaniesMiddleware,
  AuthController.createCompanyToken
);

module.exports = routes;
