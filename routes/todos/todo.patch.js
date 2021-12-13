const models = require("../../models/");
const express = require("express");
const router = express.Router();
const auth = require("./../../middleware/authorize");

// in request
// get uuid of todo from params /:uuid
// cant work without name and status, return error
// can work with only name or only status
// ===============
// in response
// return update todo

module.exports = router.patch("/todo/:uuid", auth, async (req, res, next) => {
  try {
    const status = req.body.status;
    const name = req.body.name?.trim().replace(/\s+/g, " ");

    if (!(typeof status === "boolean") && !name) throw new Error("no data");

    if (name && (name.length < 2 || name.length > 100))
      throw new Error("Need more, than 1 symbol and less, than 100");

    if (name && !name.match(/[\w]/)) throw new Error("meaningless content");

    const checkUniq =
      name &&
      (await models.Todo.findOne({
        where: {
          name,
          user_id: res.locals.userId,
        },
      }));

    if (checkUniq) throw new Error("name must be uniq");

    const todo = await models.Todo.findOne({
      where: {
        uuid: req.params.uuid,
        user_id: res.locals.userId,
      },
    });

    if (!todo) throw new Error("Todo not founded");

    await todo.update({ status, name });

    res.send("success edit", 200);
  } catch (err) {
    next(err);
  }
});
