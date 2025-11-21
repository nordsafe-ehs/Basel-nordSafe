const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Users = sequelize.define("Users", {
  fullname: {
    type: DataTypes.TEXT,
  },
  password: {
    type: DataTypes.TEXT,
  },
  email: {
    type: DataTypes.TEXT,
  },
  role: {
    type: DataTypes.ENUM,
    values: ["user", "admin", "visitor", "super-admin"],
  },
  jobDesc: {
    type: DataTypes.TEXT,
  },
  department: {
    type: DataTypes.TEXT,
  },
});

module.exports = Users;
