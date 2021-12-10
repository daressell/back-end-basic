const models = require("../../models/");
const express = require("express");
const { sequelize } = require("../../models/");
const router = express.Router();

// in request
// page
// pageSize
// filterBy(done, undone)
// sortBy(desc, asc)
// -if noone params, return frist 5 asc todos
// ===============
// in response
// return object with array of todos - data.todos
// and count of filtered todos - data.countOfTodos

module.exports = router.get("/todos", async (req, res) => {
  try {
    const filterBy = req.query.filterBy;
    const sortBy = req.query.sortBy || "asc";
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 5;
    const todosWhere = { user_id: res.locals.userId };

    filterBy === "done" && (todosWhere.status = "true");
    filterBy === "undone" && (todosWhere.status = "false");

    const todosData = await models.Todo.findAndCountAll({
      limit: pageSize,
      offset: (page - 1) * pageSize,
      where: todosWhere,
      order: [["createdAt", sortBy]],
    });

    res.send({ items: todosData.rows, countOfTodos: todosData.count }, 200);
  } catch (err) {
    console.log(err);
    if (err.errors) res.status(400).json({ message: err.errors[0].message });
    else {
      const message = err || "bad request";
      res.status(400).json({ message });
    }
  }
});
