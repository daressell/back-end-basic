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
    let items = [...db.items]
    let filterBy = req.query.filterBy || ""
    if (filterBy === "done") filterBy = true
    else if (filterBy === "undone") filterBy = false
    else filterBy = "all"
    const sortBy = req.query.sortBy || "asc"
    const page = parseInt(req.query.page) || 1
    const pageSize = parseInt(req.query.pageSize) || 5
    filterBy !== "all" &&
      (items = items.filter((item) => item.status === filterBy))
    sortBy === "asc"
      ? (items = items.sort((a, b) => {
          if (a.updatedAt > b.updatedAt) return 1
          else return -1
        }))
      : (items = items.sort((a, b) => {
          if (a.updatedAt > b.updatedAt) return -1
          else return 1
        }))
    const countOfItems = items.length
    items = items.slice((page - 1) * pageSize, page * pageSize)
    res.json({ data: { items, countOfItems }, status: 200 })
  } catch (err) {
    console.log(err)
    err.message
      ? res.json({ error: err })
      : res.json({ message: "bad request", status: 400 })
  }
}
