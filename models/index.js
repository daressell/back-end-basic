"use strict"

// const fs = require("fs")
import fs from "fs"
// const path = require("path")
import path from "path"
// const Sequelize = require("sequelize")
import { Sequelize } from "sequelize"
const basename = path.basename("index.js")
const env = process.env.NODE_ENV || "development"
// const config = require("/../config/config.js")
import config from "../config/config.js"
const db = {}

let sequelize
if (config.env) {
  sequelize = new Sequelize(process.env[config.env], config)
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config)
}

fs.readdirSync("models")
  .filter((file) => {
    return file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  })
  .forEach(async (file) => {
    const model = (await import(`./${file}`)).default(sequelize, Sequelize.DataTypes)
    console.log(model.name)
    db[model.name] = model
  })

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

export default db
