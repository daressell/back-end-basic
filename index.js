const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const recursive = require("recursive-readdir-sync")
dotenv.config()

const PORT = process.env.PORT || 3000
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

recursive(`${__dirname}/routes`).forEach((file) => app.use("/", require(file)))

app.listen(PORT, () => {
  console.log("start server on port", PORT)
})
