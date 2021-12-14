const models = require("../../models/");
const express = require("express");
const router = express.Router();
const auth = require("./../../middleware/authorize");
// in request
// get uuid of todo from params /:uuid
// ===============
// in response
// return string about success deleting

module.exports = router.delete("/todo/:uuid", auth, async (req, res, next) => {
  try {
    const todo = await models.Todo.findByPk(req.params.uuid);
    if (!todo) throw new Error("Item not founded");
    const user = await models.User.findByPk(res.locals.userId);
    if (!(await user.hasTodo(todo.uuid))) throw new Error("It is not you todo");

    await todo.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});
