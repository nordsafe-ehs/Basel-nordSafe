const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const MeetingDetails = require("./MeetingDetails");

const AgendaItem = sequelize.define(
  "AgendaItem",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    itemNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    meetingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    responsible: {
      type: DataTypes.STRING,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    description: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: "agenda_items",
    timestamps: true,
  }
);

MeetingDetails.hasMany(AgendaItem, {
  foreignKey: "meetingId",
  as: "agendaItems",
  onDelete: "CASCADE",
});
AgendaItem.belongsTo(MeetingDetails, {
  foreignKey: "meetingId",
  as: "meeting",
});


module.exports = AgendaItem;
