const models = require("../../../models");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

module.exports = router.post("/registration", async (req, res, next) => {
  try {
    let password = req.body.password || "";
    const confirm = req.body.confirm || "";
    const login = req.body.login || "";

    if (!login || !password) throw new Error("bad body properties");

    if (!password.match(/^(?=.*[A-Za-z])(?=.*\d)[\w]{8,100}$/))
      throw new Error("need more difficult password, uisng only a-b and numbers");

    if (password !== confirm) throw new Error("confirm and passwor must be equal");

    if (!login.match(/^(?=.*[A-Za-z])[\w]{4,100}$/))
      throw new Error("bad name validation, need 4-100 symbols and use only a-b and numbers");

    if (await models.User.findOne({ where: { login } })) throw new Error("user exist yet");

    password = await bcrypt.hash(req.body.password, 10);

    await models.User.create({
      login,
      password,
    });

    res.send("success registered", 200);
  } catch (err) {
    next(err);
  }
});
