const db = require('./../../todos')

module.exports = (req, res) => {
  console.log(req.query)
  res.send(db)
}
