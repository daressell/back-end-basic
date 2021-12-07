import express, { json, urlencoded } from "express"
import dotenv from "dotenv"
import cors from "cors"
import recursive from "recursive-readdir-sync"
dotenv.config()

const PORT = process.env.PORT || 3000
const app = express()

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))

recursive(`./routes`).forEach(async (file) => {
  app.use("/", (await import(`./${file}`)).default)
})

app.listen(PORT, () => {
  console.log("start server on port", PORT)
})
