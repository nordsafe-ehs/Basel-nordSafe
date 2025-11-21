const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const AssignReport = sequelize.define("AssignReport", {
  status: {
    type: DataTypes.ENUM,
    defaultValue: "Open",
    values: ["Open", "In Progress", "Closed"],
  },
});

module.exports = AssignReport;
