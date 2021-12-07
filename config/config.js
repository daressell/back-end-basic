import dotenv from "dotenv"
dotenv.config()

export default {
  username: proccess.env.USER_NAME,
  password: proccess.env.USER_PASSWORD,
  database: proccess.env.DB_NAME,
  host: "127.0.0.1",
  dialect: "postgres",
}
