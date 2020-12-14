const connection = require("../database/connection");

const crypto = require("crypto");
const bcrypt = require("bcryptjs");

module.exports = {
  async create(req, res) {
    const { email, password, authType, ...params } = req.body;

    const isEmail = await connection("users")
      .where("email", email)
      .select("email")
      .first();

    if (isEmail === undefined) {
      const id = crypto.randomBytes(4).toString("HEX");

      const hash = authType === 0 ? await bcrypt.hash(password, 10) : null;

      const data = {
        id,
        email,
        password: hash,
        authType,
        ...params,
      };

      await connection("users").insert(data);

      data.password = undefined;

      return res.json(data);
    } else {
      return res.status(400).json({ error: "Email já cadastrado no banco" });
    }
  },

  async list(req, res) {
    const users = await connection("users").select("*");

    return res.json(users);
  },
};
