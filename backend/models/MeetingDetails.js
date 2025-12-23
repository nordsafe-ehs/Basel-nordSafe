const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const MeetingDetails = sequelize.define("MeetingDetails", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  company: {
    type: DataTypes.STRING,
  },
  project: {
    type: DataTypes.STRING,
  },
  duration: {
    type: DataTypes.INTEGER,
    defaultValue: 60,
  },
  template: {
    type: DataTypes.STRING,
  },
  meetingDate: {
    type: DataTypes.DATE,
  },
  attenders:{
    type:DataTypes.INTEGER,
  },
  participant: {
    type: DataTypes.TEXT,
  },
  status: {
    type: DataTypes.ENUM,
    values: ["open", "closed"],
    defaultValue: "open",
  },
  classification: {
    type: DataTypes.ENUM,
    values: ["internal", "external"],
    defaultValue: "internal",
  },
});

module.exports = MeetingDetails;
