"use strict"

import { Sequelize } from "sequelize"
import dotenv from "dotenv"

dotenv.config()

export default new Sequelize(
  process.env.DB_NAME,
  process.env.USER_NAME,
  process.env.USER_PASSWORD,
  {
    host: "localhost",
    dialect: "postgres",
  }
)
