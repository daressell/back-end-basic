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
    console.log()
    const name = req.body.name
    const status = req.body.status
    console.log(status)
    if (!name && typeof status !== "boolean") throw "Bad request body"
    const item = await Item.findByPk(req.params.uuid)

    if (!item) throw "Item not founded"

    name && (await item.update({ name }))
    typeof status === "boolean" && (await item.update({ status }))
    res.send({ item }, 200)
  } catch (err) {
    if (err.errors) res.status(400).json({ message: err.errors[0].message })
    else {
      const message = err || "bad request"
      res.status(400).json({ message })
    }
    // const message = err || "bad request"
    // res.status(400).json({ message })
  }
}
