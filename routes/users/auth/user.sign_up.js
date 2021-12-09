const models = require("../../../models")
const bcrypt = require("bcrypt")
const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")

module.exports = router.post("/registration", async (req, res) => {
  try {
    console.log(req.body)
    if (!req.body.login || !req.body.password) throw "bad body"
    if (!req.body.login && !req.body.login.trim().replace(/\s+/g, " "))
      throw "Bad name validate"
    const password = await bcrypt.hash(req.body.password, 10)
    const login = req.body.login
    const newUser = await models.User.create({
      login,
      password,
    })
    const token = { userId: newUser.uuid }
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
