const dotenv = require("dotenv")
dotenv.config()

module.exports = {
  username: process.env.USER_NAME,
  password: process.env.USER_PASSWORD,
  database: process.env.DB_NAME,
  host: "127.0.0.1",
  dialect: "postgres",
}
