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
    const userId = res.locals.userId;
    try {
      validationResult(req).throw();
      const name = req.body.name.trim().replace(/\s+/g, " ");

      const checkExist = await models.Todo.findOne({
        where: { name, user_id: userId },
      });
      if (checkExist) throw new err("name must be uniq", 400);

      const lastTodo = await models.Todo.findOne({
        where: { user_id: res.locals.userId },
        order: [["index", "DESC"]],
        limit: 1,
      });
      console.log(lastTodo);
      const index = lastTodo?.index + 1000 || 1000;

      const newTodo = { name, index, userId };
      const createdTodo = await models.Todo.create(newTodo);

      res.send({ createdTodo }, 200);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
);
