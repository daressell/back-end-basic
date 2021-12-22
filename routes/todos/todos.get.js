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
      const { filterBy, sortBy } = req.query;
      const page = parseInt(req.query.page);
      const pageSize = parseInt(req.query.pageSize);

      const todosQuery = {
        where: { userId: res.locals.userId },
        order: [["index", sortBy]],
      };

      const result = {};

      filterBy === "done" && (todosQuery.where.status = true);
      filterBy === "undone" && (todosQuery.where.status = false);

      //find todos, which will show on page
      todosQuery.limit = pageSize;
      todosQuery.offset = (page - 1) * pageSize;
      result.todos = await models.Todo.findAndCountAll(todosQuery);

      if (result.todos.rows.length) {
        if (page < 2) {
          // generate previos todo if it this is first page
          const firstIndexVal = result.todos.rows[0].index;
          sortBy === "desc"
            ? (result.todos.prevTodo = { index: firstIndexVal + 250 })
            : (result.todos.prevTodo = { index: firstIndexVal - 250 });
        } else {
          //find previos todo from db
          todosQuery.limit = 1;
          todosQuery.offset = (page - 1) * pageSize - 1;
          result.todos.prevTodo = await models.Todo.findOne(todosQuery);
        }

        //if find limit todos, try frin next todo in db
        if (result.todos.rows.length === pageSize) {
          todosQuery.limit = 1;
          todosQuery.offset = page * pageSize;
          result.todos.nextTodo = await models.Todo.findOne(todosQuery);
        }

        // generate next todo if finded todos did not reach of limit
        // or nextTodo does not exist
        if (result.todos.rows.length !== pageSize || !result.todos.nextTodo) {
          const lastIndexVal = result.todos.rows[result.todos.rows.length - 1].index;
          sortBy === "desc"
            ? (result.todos.nextTodo = { index: lastIndexVal - 250 })
            : (result.todos.nextTodo = { index: lastIndexVal + 250 });
        }
      }

      res.send({ result: result.todos }, 200);
    } catch (err) {
      next(err);
    }
  }
);
