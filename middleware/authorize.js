const jwt = require("jsonwebtoken");
const err = require("./../errors/customError");
const models = require("../models/index");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      throw new err("A jwt is required for authentication", 500);
    }
    res.locals = jwt.verify(token, process.env.TOKEN_KEY);
    if (!(await models.User.findByPk(res.locals.userId))) throw new err("User not found", 500);
    next();
  } catch (err) {
    next(err);
  }
};
