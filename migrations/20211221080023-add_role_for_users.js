"use strict";

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn("users", "role", {
      type: Sequelize.STRING,
      defaultValue: "user",
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn("users", "role");
  },
};
