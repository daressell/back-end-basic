const models = require("../../models/");
const express = require("express");
const router = express.Router();
// in request
// get uuid of todo from params /:uuid
// ===============
// in response
// return string about success deleting

module.exports = router.delete("/todo/:uuid", async (req, res) => {
  try {
    const todo = await models.Todo.findOne({
      where: { uuid: req.params.uuid, user_id: res.locals.userId },
    });
    if (!todo) throw errors.NotFound("Item not founded");

    await todo.destroy();
    res.sendStatus(204);
  } catch (err) {
    if (err.errors) res.status(400).json({ message: err.errors[0].message });
    else {
      const message = err || "bad request";
      res.status(500).json({ message });
    }
  }
});
