import Item from "../../models/item.js"
import { Router } from "express"
const router = Router()

// in request
// get only name(has validation inside)
// ===============
// in response
// return new item

export default router.post("/item", async (req, res) => {
  try {
    if (!req.body.name) throw "Bad request body"

    const name = req.body.name.trim().replace(/\s+/g, " ")
    const newItem = await Item.create({ name })

    res.send({ newItem }, 200)
  } catch (err) {
    if (err.errors) return res.status(400).json({ message: err.errors[0].message })
    res.status(400).json({ message: err || "bad request" })
  }
})
