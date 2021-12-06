import Item from "./../../models/item.js"

// in request
// get only name(has validation inside)
// ===============
// in response
// return new item

export default async (req, res) => {
  try {
    if (!req.body.name) throw "Bad request body"
    const newItem = await Item.create(req.body)
    console.log("try")
    res.send({ newItem }, 200)
  } catch (err) {
    if (err.errors) res.status(400).json({ message: err.errors[0].message })
    else {
      const message = err || "bad request"
      res.status(400).json({ message })
    }
  }
}
