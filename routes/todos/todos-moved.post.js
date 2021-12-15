const models = require("../../models/");
const express = require("express");
const router = express.Router();
const auth = require("./../../middleware/authorize");
const err = require("./../../errors/customError");
const { validationResult, body } = require("express-validator");

module.exports = router.post(
  "/todosMoved",
  body("todos", "todos does not exist").exists(),
  auth,
  (req, res, next) => {
    try {
      validationResult(req).throw();
      const todos = req.body.todos;
    } catch (err) {
      next(err);
    }
  }
);
