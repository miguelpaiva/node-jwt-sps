const connection = require("../database/connection");

const bcrypt = require("bcryptjs");
const TokenService = require("../services/Token.service");

module.exports = {
  async loginAuthToken(req, res) {
    const { email, password } = req.body;

    const user = await connection("users")
      .where({ email: email, authType: 0 })
      .select("*")
      .first();

    if (!(await bcrypt.compare(password, user.password)))
      return res.status(400).json({ error: "Senha incorreta" });

    const userId = user.id;

    if (!userId || userId === undefined)
      return res.status(400).json({ error: "Usuario não existe" });

    const authToken = await TokenService.create({ userId });

    return res.json(authToken);
  },

  async loginOAuthToken(req, res) {
    const { email } = req.body;

    const userId = await connection("users")
      .where({ email: email, authType: 1 })
      .select("id")
      .first();

    if (!userId || userId === undefined)
      return res.status(401).json({ error: "Email ou Senha incorretos" });

    const oAuthToken = await TokenService.create({ userId });

    return res.json(oAuthToken);
  },

  async createCompanyToken(req, res) {
    const { companyId } = req.params;
    const userId = req.userId;

    const companyToken = await TokenService.create({ userId, companyId });

    return res.json(companyToken);
  },
};
