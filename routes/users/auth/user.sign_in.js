const models = require("../../../models");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = router.post("/login", async (req, res, next) => {
  try {
    if (!(req.body.login || req.body.password)) throw new Error("bad request body");
    const user = await models.User.findOne({ where: { login: req.body.login } });

    if (!user) throw new Error("invalid login or password");

    if (!user && !(await bcrypt.compare(req.body.password, user.password)))
      throw new Error({ message: "invalid login or password" });

    const token = { userId: user.uuid };
    const accessToken = jwt.sign(token, process.env.TOKEN_KEY, {
      expiresIn: "2h",
    });

    res.send({ token: accessToken }, 200);
  } catch (err) {
    next(err);
  }
});
