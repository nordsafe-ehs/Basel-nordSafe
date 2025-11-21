const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Reports = sequelize.define("Reports", {
  data: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  type: {
    type: DataTypes.ENUM,
    values: ["case-investigations", "site-monitoring", "deviations"],
  },
});

module.exports = Reports;
