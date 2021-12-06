"use strict"

import { Sequelize } from "sequelize"

export default new Sequelize("items", "mainuser", "main", {
  host: "localhost",
  dialect: "postgres",
})
