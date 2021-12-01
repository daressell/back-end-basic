import express, { json, urlencoded } from "express"
import dotenv from "dotenv"
import router from "./routes/router.js"
dotenv.config()

const PORT = process.env.PORT
const app = express()

app.use(json())
app.use(urlencoded({ extended: true }))

app.use('/', router)

app.listen(PORT, () => {
  console.log("start server")
})
