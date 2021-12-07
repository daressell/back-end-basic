import Item from "./../../models/item.js"

// in request
// get uuid of item from params /:uuid
// cant work without name and status, return error
// can work with only name or only status
// ===============
// in response
// return update item

export default async (req, res) => {
  try {
    const status = req.body.status

    const item = await Item.findByPk(req.params.uuid)

    if (!item) throw "Item not founded"

    if (req.body.name) {
      const name = req.body.name.trim().replace(/\s+/g, " ")
      await item.update({ name })
    } else if (typeof status === "boolean" || status === "true" || status === "false")
      await item.update({ status })
    else throw "Bad request body"

    res.send({ item }, 200)
  } catch (err) {
    if (err.errors) res.status(400).json({ message: err.errors[0].message })
    else {
      const message = err || "bad request"
      res.status(400).json({ message })
    }
  }
}
