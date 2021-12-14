const models = require("../../models/");
const express = require("express");
const router = express.Router();
const auth = require("./../../middleware/authorize");
const { buildCheckFunction, oneOf, validationResult } = require("express-validator");
const checkBody = buildCheckFunction(["body"]);
const checkParams = buildCheckFunction(["params"]);

// in request
// get uuid of todo from params /:uuid
// cant work without name and status, return error
// can work with only name or only status
// ===============
// in response
// return update todo

module.exports = router.patch(
  "/todo/:uuid",
  auth,
  checkParams("uuid").exists().isUUID().withMessage("bad data in uuid"),
  oneOf([
    checkBody("name").exists(),
    checkBody("status")
      .exists()
      .isIn([true, false, "true", "false"])
      .withMessage("bad data in status"),
  ]),
  checkBody("name")
    .isLength({ min: 2, max: 100 })
    .withMessage("Name need min symbols is 2 and max 100")
    .matches(/^(?=.*[\w])/)
    .withMessage("Login must be with 1 letter or 1 number minimum"),
  async (req, res, next) => {
    try {
      validationResult(req).throw();
      const status = req.body.status;
      const name = req.body.name?.trim().replace(/\s+/g, " ");

      const checkUniq =
        name &&
        (await models.Todo.findOne({
          where: {
            name,
            user_id: res.locals.userId,
          },
        }));

      if (checkUniq) throw new Error("name must be uniq");

      const todo = await models.Todo.findOne({
        where: {
          uuid: req.params.uuid,
          user_id: res.locals.userId,
        },
      });

      if (!todo) throw new Error("Todo not founded");

      await todo.update({ status, name });

      res.send("success edit", 200);
    } catch (err) {
      next(err);
    }
  }
);
