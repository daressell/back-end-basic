import db from "./../../todos.json"
import fs from "fs"

export default (req, res) => {
  try {
    if (!req.params.uuid) throw { message: "bad request", status: 400 }
    const items = db.items.map((item) => item.uuid !== req.params.uuid)
    if (items === db.items) throw { message: "item not found", status: 300 }
    db.items = items
    fs.writeFileSync("todos.json", JSON.stringify(db))
    res.json({ data: "success delete", status: 201 })
  } catch (err) {
    err.message ? res.json(err) : res.json({ message: "bad request", status: 400 })
  }
}
