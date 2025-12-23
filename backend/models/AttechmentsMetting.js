const { DataTypes } = require("sequelize");
const sequelize = require("../db.js");
const MeetingDetails = require("./MeetingDetails.js");

const Attachment = sequelize.define(
  "Attachment",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    documentName: { type: DataTypes.STRING, allowNull: false },
    member: { type: DataTypes.STRING, allowNull: false },
    filePath: { type: DataTypes.STRING, allowNull: true },
    meetingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: MeetingDetails, key: "id" },
      onDelete: "CASCADE",
    },
  },
  { timestamps: true }
);

module.exports = Attachment;
