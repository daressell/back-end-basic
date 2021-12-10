const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (req.url.includes("registration") || req.url.includes("login")) return next();
  const token = req.headers.authorization;
  if (!token) return res.status(403).send("A token is required for authentication");

  res.locals = jwt.verify(req.headers.authorization, process.env.TOKEN_KEY);
  return next();
};
