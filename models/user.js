"use strict";

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
          is: /[\w]/i,
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
      role: {
        type: Sequelize.STRING,
        validate: {
          isIn: [["admin, user"]],
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
  );
  User.associate = (models) => {
    User.hasMany(models.Todo);
  };
  return User;
};
