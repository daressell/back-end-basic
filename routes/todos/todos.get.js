const models = require("../../models/")
const express = require("express")
const router = express.Router()

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
    let filterBy = req.query.filterBy || "all"
    const sortBy = req.query.sortBy || "asc"
    const page = parseInt(req.query.page) || 1
    const pageSize = parseInt(req.query.pageSize) || 5

    if (filterBy === "done") filterBy = true
    else if (filterBy === "undone") filterBy = false
    else filterBy = "all"

    let todosOnPage
    if (filterBy === "all") {
      todosOnPage = await models.Todo.findAndCountAll({
        limit: pageSize,
        offset: (page - 1) * pageSize,
        order: [["createdAt", sortBy]],
      })
    } else {
      todosOnPage = await models.Todo.findAndCountAll({
        limit: pageSize,
        offset: (page - 1) * pageSize,
        where: {
          status: filterBy,
        },
        order: [["createdAt", sortBy]],
      })
    }

    res.send({ items: todosOnPage.rows, countOfItems: todosOnPage.count }, 200)
  } catch (err) {
    console.log(err)
    if (err.errors) res.status(400).json({ message: err.errors[0].message })
    else {
      console.log(err)
      const message = err || "bad request"
      res.status(400).json({ message })
    }
  }
})
