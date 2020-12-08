const connection = require("../database/connection");

const TokenService = require("../services/Token.service");

module.exports = {
  async loginAuthToken(req, res) {
    const { email, password } = req.body;

    const userId = await connection("users")
      .where({ email: email, password: password })
      .select("id")
      .first();

    // const userId = await connection("users").where("email", email).select("id").first();

    if (!userId || userId === undefined)
      return res.status(400).json({ error: "Email ou Senha incorretos" });

    const authToken = await TokenService.create(userId);

    return res.json(authToken);
  },

  async createCompanyToken(req, res) {
    const { companyId } = req.params;
    const userId = req.userId;

    const companyToken = await TokenService.create({ userId, companyId });

    return res.json(companyToken);
  },
};
