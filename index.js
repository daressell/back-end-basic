import express, { json, urlencoded } from "express"
import dotenv from "dotenv"
import fs from "fs"
dotenv.config()

const PORT = process.env.PORT
const app = express()

app.use(json())
app.use(urlencoded({ extended: true }))

const folders = fs.readdirSync("./controllers")
folders.map((folder) => {
  fs.readdirSync(`./controllers/${folder}`).map((file) => {
    import(`./controllers/${folder}/${file}`).then(module => {
      app.use("/todo", module.default)
    })
  })
})

app.listen(PORT, () => {
  console.log("start server")
})
