"use strict";

module.exports = (sequelize, Sequelize) => {
  const Todo = sequelize.define(
    "Todo",
    {
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
    },
    {
      tableName: "todos",
    }
  );
  Todo.associate = (models) => {
    Todo.belongsTo(models.User, {
      foreignKey: {
        type: Sequelize.UUID,
        field: "user_id",
      },
    });
  };
  return Todo;
};
