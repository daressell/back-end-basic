const express = require("express")
const config = require("config")
require("dotenv").config()

const host = config.get("dbUser.host")

const PORT = process.env.PORT
const app = express()
const routes = require("./routes/item")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/todo", routes)

app.listen(PORT, () => {
  console.log("start server")
})
