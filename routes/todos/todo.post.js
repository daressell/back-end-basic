const models = require("../../models/");
const express = require("express");
const router = express.Router();
const auth = require("./../../middleware/authorize");
const err = require("./../../errors/customError");
const { validationResult, body } = require("express-validator");

// in request
// get only name(has validation inside)
// ===============
// in response
// return new todo

module.exports = router.post(
  "/todo",
  body("name", "name does not exist").exists(),
  body("name")
    .isLength({ min: 2, max: 100 })
    .withMessage("Name need min symbols is 2 and max 100")
    .matches(/^(?=.*[0-9А-Яа-яA-Za-z])/)
    .withMessage("Login must be with 1 letter or 1 number minimum"),
  auth,
  async (req, res, next) => {
    try {
      validationResult(req).throw();
      const user = await models.User.findByPk(res.locals.userId);
      const newTodoData = { user_id: res.locals.userId };
      const name = req.body.name.trim().replace(/\s+/g, " ");

      const checkUniq = await models.Todo.findOne({
        where: { name, user_id: newTodoData.user_id },
      });
      if (checkUniq) throw new err("name must be uniq", 400);

      const allUserTodos = await models.Todo.findAll({
        where: newTodoData,
      });
      const arrOfIndex = allUserTodos.map((todo) => todo.index);

      const maxIndex = Math.max.apply(null, arrOfIndex);
      maxIndex !== -Infinity ? (newTodoData.index = maxIndex + 1) : (newTodoData.index = 1);
      newTodoData.name = name;
      const createdTodo = await user.createTodo(newTodoData);

      res.send({ createdTodo }, 200);
    } catch (err) {
      next(err);
    }
  }
);
