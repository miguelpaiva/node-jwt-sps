const connection = require("../database/connection");

const crypto = require("crypto");
//const bcrypt = require("bcryptjs");

module.exports = {
  async create(req, res) {
    const { name, email, whatsapp, sector } = req.body;

    const id = crypto.randomBytes(4).toString("HEX");
    const company_id = req.companyId;

    const data = {
      id,
      name,
      email,
      whatsapp,
      sector,
      company_id,
    };

    await connection("clients").insert(data);
    return res.json(data);
  },

  async list(req, res) {
    const company_id = req.companyId;

    const clients = await connection("clients")
      .where("company_id", company_id)
      .select("*");

    return res.json(clients);
  },

  async get(req, res) {
    const { clientId } = req.params;

    const client = await connection("clients")
      .where("id", clientId)
      .select("*")
      .first();

    if (client === undefined)
      return res.status(400).json("Cliente não encontrado");

    return res.json(client);
  },

  async delete(req, res) {
    const { clientId } = req.params;

    await connection("clients").where("id", clientId).delete();
    return res.sendStatus(204);
  },

  async update(req, res) {
    const { clientId } = req.params;
    const data = req.body;

    await connection("clients").where("id", clientId).update(data);

    return res.json(data);
  },
};
