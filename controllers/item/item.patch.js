import db from "./../../todos.json"
import fs from "fs"

// in request
// get uuid of item from params /:uuid
// cant work without name and status, return error
// can work with only name or only status
// ===============
// in response
// return update item

export default (req, res) => {
  try {
    if (!(req.body.name || req.body.status))
      throw { message: "empty params", status: 401 }
    if (!req.params.uuid) throw { message: "bad request", status: 400 }
    if (!db.items) db.items = []

    if (db.items.find((item) => item.name === req.body.name)) {
      throw { message: "This name exists", status: 400 }
    }
    const item = db.items.find((item) => item.uuid === req.params.uuid)
    const itemIndex = db.items.findIndex(
      (item) => item.uuid === req.params.uuid
    )
    if (!item.name) throw { message: "item not found", status: 300 }
    if (req.body.status) {
      const status = req.body.status === "true"
      item.status = status
    }
    if (req.body.name) {
      if (req.body.name.length < 2)
        throw { message: "Need more symbols then 1", status: 400 }
      item.name = req.body.name
    }
    item.updatedAt = new Date()
    db.items[itemIndex] = item
    fs.writeFileSync("todos.json", JSON.stringify(db))
    res.json({ data: item, status: 200 })
  } catch (err) {
    err.message
      ? res.json({ error: err })
      : res.json({ message: "bad request", status: 400 })
  }
}
