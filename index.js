const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const recursive = require("recursive-readdir-sync")
dotenv.config()

const HOST_PORT = process.env.PORT
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

recursive(`${__dirname}/routes`).forEach((file) => app.use("/", require(file)))

app.listen(process.env.PORT, () => {
  console.log("start server on port", HOST_PORT)
})
