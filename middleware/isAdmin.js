const err = require("./../errors/customError");

module.exports = async (req, res, next) => {
  try {
    if (res.locals.role !== "admin") throw new err("not admin", 500);
    next();
  } catch (err) {
    next(err);
  }
};
