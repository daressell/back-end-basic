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
    console.log("req.body", req.body)
    console.log("req.body", typeof req.body.status)
    if (!(req.body.name || typeof req.body.status === "boolean")) throw "empty params"
    if (!req.params.uuid) throw "bad request"
    if (!db.items) db.items = []

    if (db.items.find((item) => item.name === req.body.name)) {
      throw "This name exists"
    }
    const item = db.items.find((item) => item.uuid === req.params.uuid)
    const itemIndex = db.items.findIndex((item) => item.uuid === req.params.uuid)
    if (!item.name) throw "item not found"
    console.log("req.body.status", req.body.status)
    if (typeof req.body.status !== "undefined") {
      const status = req.body.status
      item.status = status
    }
    if (req.body.name) {
      if (req.body.name.length < 2) throw "Need more symbols then 1"
      item.name = req.body.name
    }
    item.updatedAt = new Date()
    db.items[itemIndex] = item
    fs.writeFileSync("todos.json", JSON.stringify(db))
    res.send({ item }, 200)
  } catch (err) {
    const message = err || "bad request"
    res.status(400).json({ message })
  }
}
