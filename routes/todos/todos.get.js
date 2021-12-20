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
      todosQuery.limit = pageSize;
      todosQuery.offset = (page - 1) * pageSize;

      const todosData = await models.Todo.findAndCountAll(todosQuery);
      console.log(todosData.rows);

      if (page - 2 >= 0) {
        todosQuery.limit = pageSize;
        todosQuery.offset = (page - 2) * pageSize;
        const todosData2 = await models.Todo.findAll(todosQuery);
        console.log(todosData2[pageSize - 1], "todosData2");
      }

      res.send({ items: todosData.rows, countOfTodos: todosData.count }, 200);
    } catch (err) {
      next(err);
    }
  }
);
