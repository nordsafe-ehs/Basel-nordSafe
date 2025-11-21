const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const SDS = sequelize.define("SDS", {
  product_name: {
    type: DataTypes.TEXT,
  },
  product_code: {
    type: DataTypes.TEXT,
  },
  mfg_detail: {
    type: DataTypes.TEXT,
  },
  issue_date: {
    type: DataTypes.TEXT,
  },
  country: {
    type: DataTypes.TEXT,
  },
  lang: {
    type: DataTypes.TEXT,
  },
  fileName: {
    type: DataTypes.TEXT,
  },
});

module.exports = SDS;
