import db from "./../../todos.json"
import fs from "fs"
import { v4 } from "uuid"

// in request
// get only name(has validation inside)
// ===============
// in response
// return new item

export default (req, res) => {
  try {
    if (!db.items) db.items = []
    if (!req.body.name) throw { message: "empty name" }
    if (req.body.name.length < 2)
      throw { message: "Need more symbols then 1", status: 400 }
    console.log(db.items.find((item) => item.name === req.body.name))
    if (db.items.find((item) => item.name === req.body.name)) {
      throw { message: "This name exists", status: 400 }
    }
    const newItem = {
      uuid: v4(),
      name: req.body.name,
      status: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    db.items.push(newItem)
    fs.writeFileSync("todos.json", JSON.stringify(db))
    res.json({ data: newItem, status: 200 })
  } catch (err) {
    err.message
      ? res.json({ error: err })
      : res.json({ message: "bad request", status: 400 })
  }
}
