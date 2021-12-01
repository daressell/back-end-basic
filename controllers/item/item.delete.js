const db = require('./../../todos')

module.exports = (req, res) => {
  res.send(req.body);
}