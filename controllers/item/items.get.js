import db from "./../../todos.json"

export default (req, res) => {
  console.log(req.query)
  res.send(db)
}
