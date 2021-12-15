module.exports = (err, req, res, next) => {
  if (err.errors) {
    return res.status(500).send(err.errors[0].msg);
  }
  return res.status(err.status || 500).send(err.message);
};
