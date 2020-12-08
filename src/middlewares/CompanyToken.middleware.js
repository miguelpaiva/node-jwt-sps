const connection = require("../database/connection");

const TokenService = require("../services/Token.service");

const CompanyTokenMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;

  try {
    const { userId, companyId } = await TokenService.decode(authorization);

    if (!userId && !companyId) {
      return res.status(401).json("token não contém propriedades válidas");
    }

    req.userId = userId;
    req.companyId = companyId;

    next();
  } catch (error) {
    return res.status(401).json("token inválido");
  }
};

module.exports = CompanyTokenMiddleware;
