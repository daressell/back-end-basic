const models = require("../../models/")
const express = require("express")
const router = express.Router()

// in request
// get uuid of todo from params /:uuid
// cant work without name and status, return error
// can work with only name or only status
// ===============
// in response
// return update todo

module.exports = router.patch("/todo/:uuid", async (req, res) => {
  try {
    console.log("qweqweqweqwe")
    const status = req.body.status

    const todo = await models.todo.findByPk(req.params.uuid)
    console.log(todo)

    if (!todo) throw "Todo not founded"

    if (req.body.name) {
      const name = req.body.name.trim().replace(/\s+/g, " ")
      await todo.update({ name })
    } else if (typeof status === "boolean" || status === "true" || status === "false")
      await todo.update({ status })
    else throw "Bad request body"

    res.send("success edit", 200)
  } catch (err) {
    if (err.errors) res.status(400).json({ message: err.errors[0].message })
    else {
      const message = err || "bad request"
      res.status(400).json({ message })
    }
  }
})
