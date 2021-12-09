const models = require("../../../models")
const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

module.exports = router.post("/login", async (req, res) => {
  try {
    console.log(req.userId)
    console.log(req.body)
    const user = await models.User.findOne({ login: req.body.login })
    console.log(user, "user")
    if (!user) throw "invalid login or password"
    if (
      !(user.login = req.body.login && bcrypt.compare(req.body.password, user.password))
    )
      throw "invalid login or password"
    const token = { userId: user.uuid }
    const accessToken = jwt.sign(token, process.env.TOKEN_KEY, {
      expiresIn: "2h",
    })
    res.send({ token: accessToken }, 200)
  } catch (err) {
    console.log(err)
    if (err.errors) return res.status(400).json({ message: err.errors[0].message })
    res.status(400).json({ message: err || "bad request" })
  }
})
