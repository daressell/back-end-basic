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
        where: { user_id: res.locals.userId },
      };
      // todosQuery.order = [["createdAt", sortBy]];

      filterBy === "done" && (todosQuery.where.status = true);
      filterBy === "undone" && (todosQuery.where.status = false);
      todosQuery.limit = pageSize;
      todosQuery.offset = (page - 1) * pageSize;

      const todosData = await models.Todo.findAndCountAll(todosQuery);
      console.log(todosData);

      res.send({ items: todosData.rows, countOfTodos: todosData.count }, 200);
    } catch (err) {
      next(err);
    }
  }
);
