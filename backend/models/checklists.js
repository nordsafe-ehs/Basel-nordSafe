const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Checklists = sequelize.define("Checklists", {
  data: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  name: {
    type: DataTypes.TEXT,
  },
});

module.exports = Checklists;
