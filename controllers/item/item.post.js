import db from "./../../todos.json"
import fs from "fs"
import { v4 } from "uuid"

export default (req, res) => {
  try {
    if (!db.items) db.items = []
    const items = db.items
    if (req.body.name.length < 2)
      throw { message: "Need more symbols then 1", status: 400 }
    if (items.filter((item) => item.name === req.body.name).length) {
      throw { message: "This name exists", status: 400 }
    }
    const newItem = {}
    newItem.uuid = v4()
    newItem.name = req.body.name
    newItem.status = false
    newItem.createdAt = new Date()
    newItem.updatedAt = new Date()
    db.items.push(newItem)
    fs.writeFileSync("todos.json", JSON.stringify(db))
    res.json({ data: newItem, status: 200 })
  } catch (err) {
    err.message ? res.json(err) : res.json({ message: "bad request", status: 400 })
  }
}
