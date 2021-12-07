import Item from "../../models/item.js"
import { Router } from "express"
const router = Router()

// in request
// page
// pageSize
// filterBy(done, undone)
// sortBy(desc, asc)
// -if noone params, return frist 5 asc items
// ===============
// in response
// return object with array of items - data.items
// and count of filtered items - data.countOfItems

export default router.get("/items", async (req, res) => {
  try {
    let filterBy = req.query.filterBy || "all"
    const sortBy = req.query.sortBy || "asc"
    const page = parseInt(req.query.page) || 1
    const pageSize = parseInt(req.query.pageSize) || 5

    if (filterBy === "done") filterBy = true
    else if (filterBy === "undone") filterBy = false
    else filterBy = "all"

    let itemsOnPage
    if (filterBy === "all") {
      itemsOnPage = await Item.findAndCountAll({
        limit: pageSize,
        offset: (page - 1) * pageSize,
        order: [["createdAt", sortBy]],
      })
    } else {
      itemsOnPage = await Item.findAndCountAll({
        limit: pageSize,
        offset: (page - 1) * pageSize,
        where: {
          status: filterBy,
        },
        order: [["createdAt", sortBy]],
      })
    }

    res.send({ items: itemsOnPage.rows, countOfItems: itemsOnPage.count }, 200)
  } catch (err) {
    if (err.errors) res.status(400).json({ message: err.errors[0].message })
    else {
      const message = err || "bad request"
      res.status(400).json({ message })
    }
  }
})
