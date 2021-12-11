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
    const todo = await models.Todo.findOne({
      where: { uuid: req.params.uuid, user_id: res.locals.userId },
    });
    if (!todo) throw new Error("Item not founded");

    await todo.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});
