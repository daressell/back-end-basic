"use strict"

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "User",
    {
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      login: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          is: /[\wа-яА-Я]/i,
          len: [2, 100],
        },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [2, 100],
        },
      },
      createdAt: {
        type: Sequelize.DATE,
        field: "created_at",
      },
      updatedAt: {
        type: Sequelize.DATE,
        field: "updated_at",
      },
    },
    {
      tableName: "users",
    }
  )
  User.associate = (models) => {
    User.hasMany(models.Todo)
  }
  return User
}
