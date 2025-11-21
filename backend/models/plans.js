const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Plans = sequelize.define("Plans", {
  customUsersCount: {
    type: DataTypes.INTEGER,
  },
  customAdminsCount: {
    type: DataTypes.INTEGER,
  },
  customProjectsCount: {
    type: DataTypes.INTEGER,
  },
  customMonthlySDSSearchCount: {
    type: DataTypes.INTEGER,
  },
  customMonthlySDSSaveCount: {
    type: DataTypes.INTEGER,
  },
});

module.exports = Plans;
