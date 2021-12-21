const models = require("../../models/");
const express = require("express");
const router = express.Router();
const auth = require("../../middleware/authorize");
const isAdmin = require("../../middleware/isAdmin");
const { validationResult, query } = require("express-validator");

module.exports = router.get("/users", auth, isAdmin, async (req, res, next) => {
  try {
    validationResult(req).throw();
    const users = await models.User.findAll();
    res.send({ users }, 200);
  } catch (err) {
    next(err);
  }
});
