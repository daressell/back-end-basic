import Todo from "../../models/todo.js"
import { Router } from "express"
const router = Router()

// in request
// get uuid of todo from params /:uuid
// ===============
// in response
// return string about success deleting

export default router.delete("/todo/:uuid", async (req, res) => {
  try {
    const todo = await Todo.findByPk(req.params.uuid)
    if (todo) (await todo.destroy()) && res.send("success delete", 200)
    else throw "Item not founded"
  } catch (err) {
    if (err.errors) res.status(400).json({ message: err.errors[0].message })
    else {
      const message = err || "bad request"
      res.status(400).json({ message })
    }
  }
})
