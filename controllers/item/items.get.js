import db from "./../../todos.json"

export default (req, res) => {
  try {
    let page = 1
    let pageSize = 5
    let items = [...db.items]
    let countOfItems = items.length
    let filterBy = req.query.filterBy || ""
    if (filterBy === "true") filterBy = true
    else if (filterBy === "false") filterBy = false
    else filterBy = "all"
    const sortBy = req.query.sortBy || "asc"
    page = parseInt(req.query.page) || 1
    pageSize = parseInt(req.query.pageSize) || 5
    filterBy !== "all" && (items = items.filter((item) => item.status === filterBy))
    sortBy === "asc"
      ? (items = items.sort((a, b) => {
          if (a.updatedAt > b.updatedAt) return 1
          else return -1
        }))
      : (items = items.sort((a, b) => {
          if (a.updatedAt > b.updatedAt) return -1
          else return 1
        }))
    countOfItems = items.length
    items = items.slice((page - 1) * pageSize, page * pageSize)
    res.json({ data: { items, countOfItems }, status: 200 })
  } catch (err) {
    err.message ? res.json({ message: "bad request", status: 400 }) : res.json(err)
  }
}
