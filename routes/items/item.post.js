import Todo from "../../models/todo.js"
import { Router } from "express"
const router = Router()

// in request
// get only name(has validation inside)
// ===============
// in response
// return new todo

export default router.post("/todo", async (req, res) => {
  try {
    if (!req.body.name) throw "Bad request body"

    const name = req.body.name.trim().replace(/\s+/g, " ")
    const newTodo = await Todo.create({ name })

    res.send({ newTodo }, 200)
  } catch (err) {
    if (err.errors) return res.status(400).json({ message: err.errors[0].message })
    res.status(400).json({ message: err || "bad request" })
  }
})
