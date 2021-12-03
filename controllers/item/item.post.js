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
    const items = db.items
    if (req.body.name.length < 2) throw "Need more symbols then 1"
    if (items.filter((item) => item.name === req.body.name).length) {
      throw "This name exists"
    }
    const newItem = {}
    newItem.uuid = v4()
    newItem.name = req.body.name
    newItem.status = false
    newItem.createdAt = new Date()
    newItem.updatedAt = new Date()
    db.items.push(newItem)
    fs.writeFileSync("todos.json", JSON.stringify(db))
    res.send({ newItem }, 200)
  } catch (err) {
    const message = err || "bad request"
    res.status(400).json({ message })
  }
}
