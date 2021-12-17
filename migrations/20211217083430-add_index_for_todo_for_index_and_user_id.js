"use strict";

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addIndex("todos", ["index", "user_id"]);
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeIndex("todos", ["index", "user_id"]);
  },
};
