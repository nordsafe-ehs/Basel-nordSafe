const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const BasePlans = sequelize.define("BasePlans", {
  name: {
    type: DataTypes.TEXT,
  },
  usersCount: {
    type: DataTypes.INTEGER,
  },
  adminsCount: {
    type: DataTypes.INTEGER,
  },
  projectsCount: {
    type: DataTypes.INTEGER,
  },
  monthlySDSSearchCount: {
    type: DataTypes.INTEGER,
  },
  monthlySDSSaveCount: {
    type: DataTypes.INTEGER,
  },
  price: {
    type: DataTypes.INTEGER,
  },
  paymentLink: {
    type: DataTypes.TEXT,
  },
  productId: {
    type: DataTypes.TEXT,
  },
});

module.exports = BasePlans;
