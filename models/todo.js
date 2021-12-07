"use strict"

export default (sequelize, Sequelize) => {
  return sequelize.define("todo", {
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
}
