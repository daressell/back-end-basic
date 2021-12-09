"use strict"

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn("users", "refresh_token", {
      type: Sequelize.STRING,
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn("users", "refresh_token")
  },
}
