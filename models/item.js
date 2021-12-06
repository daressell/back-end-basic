"use strict"

import { Sequelize } from "sequelize"
import sequelize from "./index.js"

export default sequelize.define("item", {
  uuid: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      is: /[\wа-яА-Я]/i,
      len: [2, 100],
    },
  },
  status: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    field: "status",
  },
  createdAt: {
    type: Sequelize.DATE,
    field: "created_at",
  },
  updatedAt: {
    type: Sequelize.DATE,
    field: "updated_at",
  },
})
