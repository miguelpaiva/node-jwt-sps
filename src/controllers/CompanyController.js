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

    try {
      await connection("companies").insert(data);

      return res.json(data);
    } catch (error) {
      alert("Não foi possível criar o usuário, tente novamente!");
    }
  },

  async list(req, res) {
    const user_id = req.userId;
    try {
      const companies = await connection("companies")
        .where("user_id", user_id)
        .select("*");

      return res.json(companies);
    } catch (error) {
      return res.json(error.message);
    }
  },

  async delete(req, res) {
    const { companyId } = req.params;
    if (!companyId) return res.status(401).json("No params added.");

    try {
      await connection("companies").where("id", companyId).delete();
      return res.status(204).send();
    } catch (error) {
      return res.json("Empresa nao existe, tente novamente!");
    }
  },

  async update(req, res) {
    const { companyId } = req.params;
    const data = req.body;

    if (!companyId) return res.status(401).json("No params added.");

    try {
      await connection("companies").where("id", companyId).update(data);

      return res.status(200).json(data);
    } catch (error) {
      return res.json("Empresa nao existe, tente novamente!");
    }
  },
};
