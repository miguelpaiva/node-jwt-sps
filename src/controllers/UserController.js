const connection = require("../database/connection");

const crypto = require("crypto");
//const bcrypt = require("bcryptjs");

module.exports = {
  async create(req, res) {
    const { name, email, password } = req.body;

    const id = crypto.randomBytes(4).toString("HEX");

    const data = {
      id,
      name,
      email,
      password,
    };

    await connection("users").insert(data);

    return res.json(data);
  },

  async list(req, res) {
    const users = await connection("users").select("*");

    return res.json(users);
  },
};
