import express, { json, urlencoded } from "express"
import dotenv from "dotenv"
import cors from "cors"
import fs from "fs"
dotenv.config()

const PORT = process.env.PORT || 3000
const app = express()

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))

fs.readdirSync("./routes").map((file) => {
  import(`./routes/${file}`).then((module) => {
    app.use("/", module.default)
  })
})

// app.use("/", router)

app.listen(PORT, () => {
  console.log("start server")
})
