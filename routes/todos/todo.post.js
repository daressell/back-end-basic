const models = require("../../models/");
const express = require("express");
const router = express.Router();
const auth = require("./../../middleware/authorize");

// in request
// get only name(has validation inside)
// ===============
// in response
// return new todo

module.exports = router.post("/todo", auth, async (req, res, next) => {
  try {
    const user = await models.User.findByPk(res.locals.userId);

    if (!req.body.name && !req.body.name.trim().replace(/\s+/g, " "))
      throw new Error("Bad request body");

    const name = req.body.name.trim().replace(/\s+/g, " ");
    const newTodo = await user.createTodo({ name });

    res.send({ newTodo }, 200);
  } catch (err) {
    next(err);
  }
});
