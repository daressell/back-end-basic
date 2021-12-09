const models = require("../../models/")
const express = require("express")
const router = express.Router()

// in request
// get only name(has validation inside)
// ===============
// in response
// return new todo

module.exports = router.post("/todo", async (req, res) => {
  try {
    const user = await models.User.findByPk("9eb5d0a4-2833-4cbc-8234-a119b5c3e767")
    const arr = await user.createTodo({ name: "some" })
    console.log(arr)

    // 2 lines for check body of funcrion
    // const entire = user.getTodos.toString() // this part may fail!
    // const body = entire.substring(entire.indexOf("{") + 1, entire.lastIndexOf("}"))

    // console.log(body, "qweqweqwew")
    // console.log(user.getTodos())

    // return association[realMethod](this, ...Array.from(arguments))

    // if (!req.body.name && !req.body.name.trim().replace(/\s+/g, " "))
    //   throw "Bad request body"
    // const name = req.body.name.trim().replace(/\s+/g, " ")
    // const newTodo = await models.Todo.create({ name })

    // res.send({ newTodo }, 200)
    res.send(
      Object.getOwnPropertyNames(user).filter((item) => item),
      200
    )
  } catch (err) {
    console.log(err)
    if (err.errors) return res.status(400).json({ message: err.errors[0].message })
    res.status(400).json({ message: err || "bad request" })
  }
})
