import db from "./../../todos.json"
import fs from "fs"

// in request
// get uuid of item from params /:uuid
// ===============
// in response
// return string about success deleting

export default (req, res) => {
  try {
    if (!req.params.uuid) throw "bad request"
    const items = db.items.filter((item) => item.uuid !== req.params.uuid)
    if (items === db.items) throw "item not found"
    db.items = items
    fs.writeFileSync("todos.json", JSON.stringify(db))
    res.send("success delete", 200)
  } catch (err) {
    const message = err || "bad request"
    res.status(400).json({ message })
  }
}
