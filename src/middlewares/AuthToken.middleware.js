const TokenService = require("../services/Token.service");

const AuthTokenMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;

  try {
    const { userId } = await TokenService.decode(authorization);

    if (!userId) {
      return res.status(401).json("token não contém propriedades válidas");
    }

    req.userId = userId;

    next();
  } catch (error) {
    return res.status(401).json("token inválido");
  }
};

module.exports = AuthTokenMiddleware;
