"use strict"

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn("todos", "user_id", {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn("todos", "user_id")
  },
}
