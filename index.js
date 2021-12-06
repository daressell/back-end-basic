import express, { json, urlencoded } from "express"
import dotenv from "dotenv"
import router from "./routes/router.js"
import cors from "cors"
dotenv.config()

const PORT = process.env.PORT || 3000
const app = express()

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))

app.use("/", router)

app.listen(PORT, () => {
  console.log("start server")
})
