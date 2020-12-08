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

    try {
      await connection("clients").insert(data);

      return res.json(data);
    } catch (error) {
      alert("Não foi possível criar o usuário, tente novamente!");
    }
  },

  async list(req, res) {
    const company_id = req.companyId;
    try {
      const clients = await connection("clients")
        .where("company_id", company_id)
        .select("*");

      return res.json(clients);
    } catch (error) {
      return res.json("Não há clientes, cadastre um novo cliente!");
    }
  },

  async delete(req, res) {
    const { clientId } = req.params;
    if (!clientId) return res.status(401).json("No params added.");

    try {
      await connection("clients").where("id", clientId).delete();
      return res.status(204).send();
    } catch (error) {
      return res.json("Cliente nao existe, tente novamente!");
    }
  },

  async update(req, res) {
    const { clientId } = req.params;
    const data = req.body;

    if (!clientId) return res.status(401).json("No params added.");

    try {
      await connection("clients").where("id", clientId).update(data);

      return res.status(200).json(data);
    } catch (error) {
      return res.json("Cliente nao existe, tente novamente!");
    }
  },
};
