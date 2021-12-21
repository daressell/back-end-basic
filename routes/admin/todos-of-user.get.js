const models = require("../../models/");
const express = require("express");
const router = express.Router();
const auth = require("./../../middleware/authorize");
const isAdmin = require("../../middleware/isAdmin");
const { validationResult, query } = require("express-validator");

// in request.query
// page - numeric
// pageSize - numeric
// filterBy(done, undone)
// sortBy(desc, asc)
// ===============
// in response
// return object with array of todos on page - data.todos
// and count of filtered todos - data.countOfTodos

module.exports = router.get("/todosOfUser", auth, isAdmin, async (req, res, next) => {
  try {
    validationResult(req).throw();

    const todos = await models.Todo.findAll({
      where: { userId: req.query.userId },
      order: [["index", "desc"]],
    });

    res.send({ todos }, 200);
  } catch (err) {
    next(err);
  }
});
