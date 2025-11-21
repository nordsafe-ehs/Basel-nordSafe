const { DataTypes } = require("sequelize");
const sequelize = require("../db");

// Meeting Model
const Meeting = sequelize.define("Meeting", {
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
  organizer: DataTypes.STRING,
  date: DataTypes.DATEONLY,
  time: DataTypes.TIME,
  location: DataTypes.STRING,
  participants: DataTypes.TEXT,
  notes: DataTypes.TEXT,
  signedBy: DataTypes.STRING,
  signedRole: DataTypes.STRING,
  signedDate: DataTypes.DATEONLY,
});

// Agenda Item Model
const AgendaItem = sequelize.define("AgendaItem", {
  topic: DataTypes.STRING,
  responsible: DataTypes.STRING,
  notes: DataTypes.TEXT,
  action: DataTypes.STRING,
  deadline: DataTypes.DATEONLY,
});

// Decision Model
const Decision = sequelize.define("Decision", {
  decisionText: DataTypes.TEXT,
});

// Open Action Model
const OpenAction = sequelize.define("OpenAction", {
  action: DataTypes.STRING,
  responsible: DataTypes.STRING,
  deadline: DataTypes.DATEONLY,
  status: { type: DataTypes.STRING, defaultValue: "Open" },
});

// ✅ Relations (with explicit foreignKey to avoid duplicate MeetingId)
Meeting.hasMany(AgendaItem, { foreignKey: "meetingId", onDelete: "CASCADE" });
AgendaItem.belongsTo(Meeting, { foreignKey: "meetingId" });

Meeting.hasMany(Decision, { foreignKey: "meetingId", onDelete: "CASCADE" });
Decision.belongsTo(Meeting, { foreignKey: "meetingId" });

Meeting.hasMany(OpenAction, { foreignKey: "meetingId", onDelete: "CASCADE" });
OpenAction.belongsTo(Meeting, { foreignKey: "meetingId" });

module.exports = { Meeting, AgendaItem, Decision, OpenAction };
