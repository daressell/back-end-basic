import db from "./../../todos.json"
import fs from "fs"

// in request
// get uuid of item from params /:uuid
// ===============
// in response
// return string about success deleting

export default (req, res) => {
  try {
    if (!req.params.uuid) throw { message: "bad request", status: 400 }
    const items = db.items.map((item) => item.uuid !== req.params.uuid)
    if (items === db.items) throw { message: "item not found", status: 300 }
    db.items = items
    fs.writeFileSync("todos.json", JSON.stringify(db))
    res.json({ data: "success delete", status: 201 })
  } catch (err) {
    err.message
      ? res.json({ error: err })
      : res.json({ message: "bad request", status: 400 })
  }
}
