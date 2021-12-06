import Item from "./../../models/item.js"

// in request
// get uuid of item from params /:uuid
// ===============
// in response
// return string about success deleting

export default async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.uuid)
    if (item) (await item.destroy()) && res.send("success delete", 200)
    else throw "Item not founded"
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
