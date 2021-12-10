const models = require("../../models/");
const express = require("express");
const router = express.Router();

// in request
// get uuid of todo from params /:uuid
// cant work without name and status, return error
// can work with only name or only status
// ===============
// in response
// return update todo

module.exports = router.patch("/todo/:uuid", async (req, res) => {
  try {
    const status = req.body.status;
    const name = req.body.name?.trim().replace(/\s+/g, " ");

    if (!status && !name) throw new Error("no data");

    const todo = await models.Todo.findOne({
      where: {
        uuid: req.params.uuid,
        user_id: res.locals.userId,
      },
    });

    if (!todo) throw "Todo not founded";

    await todo.update({ status, name });

    res.send("success edit", 200);
  } catch (err) {
    if (err.errors) res.status(400).json({ message: err.errors[0].message });
    else {
      const message = err || "bad request";
      res.status(400).json({ message });
    }
  }
});
