import db from "./../../todos.json"

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

export default (req, res) => {
  try {
    let page = 1
    let pageSize = 5
    let items = [...db.items]
    let countOfItems = items.length
    let filterBy = req.query.filterBy || ""
    if (filterBy === "done") filterBy = true
    else if (filterBy === "undone") filterBy = false
    else filterBy = "all"
    const sortBy = req.query.sortBy || "asc"
    page = parseInt(req.query.page) || 1
    pageSize = parseInt(req.query.pageSize) || 5
    filterBy !== "all" && (items = items.filter((item) => item.status === filterBy))
    sortBy === "asc"
      ? (items = items.sort((a, b) => {
          if (a.createdAt > b.createdAt) return 1
          else return -1
        }))
      : (items = items.sort((a, b) => {
          if (a.createdAt > b.createdAt) return -1
          else return 1
        }))
    countOfItems = items.length
    items = items.slice((page - 1) * pageSize, page * pageSize)
    res.send({ items, countOfItems }, 200)
  } catch (err) {
    const message = err || "bad request"
    res.status(400).json({ message })
  }
}
