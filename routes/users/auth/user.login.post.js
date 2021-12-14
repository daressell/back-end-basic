const models = require("../../../models");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { buildCheckFunction, oneOf, validationResult } = require("express-validator");
const checkBody = buildCheckFunction(["body"]);

module.exports = router.post(
  "/login",
  checkBody("login").exists(),
  checkBody("password").exists(),
  async (req, res, next) => {
    try {
      validationResult(req).throw();
      const user = await models.User.findOne({ where: { login: req.body.login } });

      if (!user) throw new Error("user with this login does not exist");

      if (!(await bcrypt.compare(req.body.password, user.password)))
        throw new Error("invalid password");

      const token = { userId: user.uuid };
      const accessToken = jwt.sign(token, process.env.TOKEN_KEY, {
        expiresIn: "2h",
      });

      res.send({ token: accessToken }, 200);
    } catch (err) {
      next(err);
    }
  }
);
