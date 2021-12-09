const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
  if (req.url.includes("registration")) return next()
  const token = req.headers.authorization
  if (!token) return res.status(403).send("A token is required for authentication")

  req.userId = jwt.verify(req.headers.authorization, process.env.TOKEN_KEY).userId
  return next()
}
