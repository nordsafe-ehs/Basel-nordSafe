const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Projects = sequelize.define("Projects", {
  name: {
    type: DataTypes.TEXT,
  },
  location: {
    type: DataTypes.TEXT,
  },
});

module.exports = Projects;
