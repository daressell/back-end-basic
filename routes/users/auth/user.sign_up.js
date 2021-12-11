const models = require("../../../models");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

module.exports = router.post("/registration", async (req, res, next) => {
  try {
    if (!req.body.login || !req.body.password) throw new Error("bad body properties");

    if (!req.body.login && !req.body.login.trim().replace(/\s+/g, " "))
      throw new Error("Bad name validate");

    const password = await bcrypt.hash(req.body.password, 10);
    const login = req.body.login;
    if (models.User.findOne({ where: { login } })) throw new Error("user exist yet");

    const newUser = await models.User.create({
      login,
      password,
    });

    const token = { userId: newUser.uuid };
    const accessToken = jwt.sign(token, process.env.TOKEN_KEY, {
      expiresIn: "2h",
    });

    res.send({ token: accessToken }, 200);
  } catch (err) {
    next(err);
  }
});
