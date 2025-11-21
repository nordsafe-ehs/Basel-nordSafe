const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const EntranceLog = sequelize.define("EntranceLog", {
  inTime: {
    type: DataTypes.DATE,
  },
  outTime: {
    type: DataTypes.DATE,
  },
  extraTime: {
    type: DataTypes.DATE,
  },
});

module.exports = EntranceLog;
