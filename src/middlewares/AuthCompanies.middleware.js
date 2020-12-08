const connection = require("../database/connection");

const AuthCompanies = async (req, res, next) => {
  const { companyId } = req.params;
  const userId = req.userId;

  try {
    // ver se empresa pertence a usuario

    const isCompanyInUser = await connection("companies")
      .where({ user_id: userId, id: companyId })
      .select("*")
      .first();

    if (!isCompanyInUser)
      return res
        .status(401)
        .json(`empresa não pertence ao usuário ${req.userId}`);

    next();
  } catch (error) {
    return res.status(401).json("token inválido");
  }
};

module.exports = AuthCompanies;
