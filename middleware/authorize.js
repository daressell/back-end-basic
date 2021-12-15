const jwt = require("jsonwebtoken");
const err = require("./../errors/customError");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      throw new err("A jwt is required for authentication", 500);
    }
    res.locals = jwt.verify(token, process.env.TOKEN_KEY);
    next();
  } catch (err) {
    next(err);
  }
};
