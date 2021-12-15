const models = require("../../models/");
const express = require("express");
const router = express.Router();
const auth = require("./../../middleware/authorize");
const err = require("./../../errors/customError");
const { param, validationResult } = require("express-validator");

// in request
// get uuid of todo from params /:uuid
// ===============
// in response
// return string about success deleting

module.exports = router.delete(
  "/todo/:uuid",
  auth,
  param("uuid").exists().isUUID().withMessage("bad data in uuid"),
  async (req, res, next) => {
    try {
      validationResult(req).throw();
      const todo = await models.Todo.findByPk(req.params.uuid);
      if (!todo) throw new err("Item not founded", 404);
      const user = await models.User.findByPk(res.locals.userId);
      if (!(await user.hasTodo(todo.uuid))) throw new err("It is not you todo", 400);

      await todo.destroy();
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
);
