// const dotenv = require("dotenv")
import dotenv from "dotenv"
dotenv.config()

export default {
  username: process.env.USER_NAME,
  password: process.env.USER_PASSWORD,
  database: process.env.DB_NAME,
  host: "127.0.0.1",
  dialect: "postgres",
}
