const models = require("../../models/");
const express = require("express");
const router = express.Router();
const auth = require("./../../middleware/authorize");
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

module.exports = router.get(
  "/todos",
  auth,
  query("filterBy", "filterBy does not exist").exists(),
  query("sortBy", "sortBy does not exist").exists(),
  query("page")
    .exists()
    .withMessage("page does not exist")
    .matches(/\d+$/)
    .withMessage("page must be a number"),
  query("pageSize")
    .exists()
    .withMessage("pageSize does not exist")
    .matches(/\d+$/)
    .withMessage("pageSize must be a number"),
  async (req, res, next) => {
    try {
      validationResult(req).throw();
      const { filterBy, sortBy, page, pageSize } = req.query;

      const todosQuery = {
        where: { userId: res.locals.userId },
      };
      todosQuery.order = [["index", sortBy]];

      filterBy === "done" && (todosQuery.where.status = true);
      filterBy === "undone" && (todosQuery.where.status = false);
      todosQuery.limit = pageSize + 1;
      todosQuery.offset = (page - 1) * pageSize;

      const todosData = await models.Todo.findAndCountAll(todosQuery);

      if (todosData.rows.length) {
        if (page - 2 >= 0) {
          todosQuery.limit = 1;
          todosQuery.offset = (page - 2) * pageSize + pageSize - 1;
          todosData.prevTodo = await models.Todo.findOne(todosQuery);
        } else {
          sortBy === "desc"
            ? (todosData.prevTodo = { index: todosData.rows[0].index + 1000 })
            : (todosData.prevTodo = { index: todosData.rows[0].index - 1000 });
        }
      }
      todosData.rows.unshift(todosData.prevTodo);
      res.send(
        {
          items: todosData.rows,
          countOfTodos: todosData.count,
          prevTodoIndex: todosData.prevTodo?.index,
        },
        200
      );
    } catch (err) {
      next(err);
    }
  }
);
