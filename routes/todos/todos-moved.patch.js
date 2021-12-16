const models = require("../../models");
const express = require("express");
const router = express.Router();
const auth = require("../../middleware/authorize");
const err = require("../../errors/customError");
const { validationResult, body } = require("express-validator");

module.exports = router.patch(
  "/todosMoved",
  body("todos", "todos does not exist").exists(),
  auth,
  async (req, res, next) => {
    try {
      validationResult(req).throw();
      const todos = req.body.todos;
      if (!Array.isArray(todos)) throw new err("request data must be array", 400);
      todos.forEach(async (todo) => {
        const item = await models.Todo.findByPk(todo.uuid);
        if (!item || !todo.index) throw new err("bad request data", 402);
        if (!parseInt(todo.index)) throw new err("data must be array with string and int", 400);
        await item.update({ index: todo.index });
      });
      res.send(todos);
    } catch (err) {
      next(err);
    }
  }
);
