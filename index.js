const express = require("express")
require("dotenv").config()

const PORT = process.env.PORT
const app = express()
const routes = require("./routes/item")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/todo", routes)

app.listen(PORT, () => {
  console.log("start server")
})
