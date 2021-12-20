const models = require("../../models");
const express = require("express");
const router = express.Router();
const auth = require("../../middleware/authorize");
const err = require("../../errors/customError");
const { validationResult, body } = require("express-validator");

module.exports = router.patch(
  "/todoMoved",
  body("todo", "todo does not exist").exists(),
  auth,
  async (req, res, next) => {
    try {
      validationResult(req).throw();
      const todoData = req.body.todo;
      const todo = await models.Todo.findByPk(todoData.uuid);
      await todo.update({ index: parseInt(todoData.index) });
      res.send(todo);
    } catch (err) {
      next(err);
    }
  }
);
