const models = require("../../models/")
const express = require("express")
const router = express.Router()

module.exports = router.post("/user", async (req, res) => {
  try {
    console.log(req.body)
    const newUser = await models.User.create(req.body)
    res.send(
      Object.getOwnPropertyNames(models.User).filter((item) => item),
      200
    )
  } catch (err) {
    if (err.errors) return res.status(400).json({ message: err.errors[0].message })
    res.status(400).json({ message: err || "bad request" })
  }
})
