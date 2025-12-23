// models/Participant.js
const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Participant = sequelize.define("Participant", {
  documentId: { type: DataTypes.STRING(100), allowNull: true },
  title: { type: DataTypes.STRING(200), allowNull: true },
  projectNumber: { type: DataTypes.STRING(50), allowNull: true },
  projectName: { type: DataTypes.STRING(200), allowNull: true },
  client: { type: DataTypes.STRING(200), allowNull: true },
  contract: { type: DataTypes.STRING(200), allowNull: true },
  projectManager: { type: DataTypes.STRING(200), allowNull: true },
  revisionNo: { type: DataTypes.STRING(20), allowNull: true },
  preparedBy: { type: DataTypes.STRING(200), allowNull: true },
  approvedBy: { type: DataTypes.STRING(200), allowNull: true },
  name: { type: DataTypes.STRING, allowNull: true },
  position: { type: DataTypes.STRING, allowNull: true },
  signatureUrl: { type: DataTypes.TEXT, allowNull: true },
});



module.exports = Participant;
