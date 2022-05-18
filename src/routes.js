const { Router } = require('express');
const routes = new Router();

const AuthTokenMiddleware = require('./middlewares/AuthToken.middleware');
const CompanyTokenMiddleware = require('./middlewares/CompanyToken.middleware');

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const companiesRoutes = require('./routes/companies.routes');

const clientsRoutes = require('./routes/clients.routes');

routes.use('/auth', authRoutes);
routes.use('/users', userRoutes);
routes.use('/companies', AuthTokenMiddleware, companiesRoutes);
routes.use('/clients', CompanyTokenMiddleware, clientsRoutes);

module.exports = routes;
