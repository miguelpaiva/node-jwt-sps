const connection = require("../database/connection");

const crypto = require("crypto");
//const bcrypt = require("bcryptjs");

module.exports = {
  async create(req, res) {
    const { name, email, phone, description } = req.body;

    const id = crypto.randomBytes(4).toString("HEX");
    const user_id = req.userId;

    const data = {
      id,
      name,
      email,
      phone,
      description,
      user_id,
    };

    await connection("companies").insert(data);

    return res.json(data);
  },

  async list(req, res) {
    const user_id = req.userId;

    const companies = await connection("companies")
      .where("user_id", user_id)
      .select("*");

    return res.json(companies);
  },

  async get(req, res) {
    const { companyId } = req.params;
    if (!companyId) return res.status(401).json("No params added.");

    const company = await connection("companies")
      .where("id", companyId)
      .select("*")
      .first();

    if (company === undefined)
      return res.status(400).json("Empresa não encontrada");

    return res.json(company);
  },

  async delete(req, res) {
    const { companyId } = req.params;

    await connection("companies").where("id", companyId).delete();
    return res.sendStatus(204);
  },

  async update(req, res) {
    const { companyId } = req.params;
    const data = req.body;

    await connection("companies").where("id", companyId).update(data);

    return res.json(data);
  },
};
