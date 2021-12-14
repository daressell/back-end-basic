const models = require("../../../models");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const { buildCheckFunction, oneOf, validationResult } = require("express-validator");
const checkBody = buildCheckFunction(["body"]);

module.exports = router.post(
  "/registration",

  checkBody("login", "login does not exist").exists(),
  checkBody("password", "password does not exist").exists(),
  checkBody("confirm", "confirm does not exist").exists(),

  checkBody("password")
    .isLength({ min: 8, max: 100 })
    .withMessage("Password need min symbols is 8 and max 100")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[\w]{8,100}$/)
    .withMessage(
      "password must be without spaces and specials signs(1 number and 1 letter minimum)"
    ),

  checkBody("login")
    .isLength({ min: 4, max: 100 })
    .withMessage("Login need min symbols is 4 and max 100")
    .matches(/^(?=.*[A-Za-z])[\w]{4,100}$/)
    .withMessage("Login must be without spaces and specials signs(1 letter minimum)"),
  async (req, res, next) => {
    try {
      validationResult(req).throw();
      let password = req.body.password;
      const { confirm, login } = req.body;

      if (password !== confirm) throw new Error("confirm and passwor must be equal");
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
  }
);
