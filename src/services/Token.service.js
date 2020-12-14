require("dotenv").config();
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

module.exports = {
  async decode(authorization) {
    if (authorization === undefined) return "token inexistente!";

    const [, authorizationToken] = authorization.split(" ");

    if (!authorizationToken || authorizationToken == "") return "token vazio!";

    const decoded = await promisify(jwt.verify)(
      authorizationToken,
      process.env.KEY
    );

    return decoded;
  },

  async create(payloads) {
    if (payloads == undefined || null) return null;

    const token = await jwt.sign(payloads, process.env.KEY, {
      expiresIn: 28800, // expira em 8 horas
    });

    return token;
  },
};
