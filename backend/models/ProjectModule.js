// // models/projectModule.js
// const { DataTypes } = require("sequelize");
// const sequelize = require("../db");

// const ProjectModule = sequelize.define(
//   "ProjectModule",
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     title: {
//       type: DataTypes.STRING(255),
//       allowNull: false,
//     },
//     category: {
//       type: DataTypes.STRING(100),
//       allowNull: true,
//     },
//     phase: {
//       type: DataTypes.STRING(100),
//       allowNull: true,
//     },
//     description: {
//       type: DataTypes.TEXT,
//       allowNull: true,
//     },
//     hazards: {
//       type: DataTypes.TEXT,
//       allowNull: true,
//     },
//     risks: {
//       type: DataTypes.TEXT,
//       allowNull: true,
//     },
//     controls: {
//       type: DataTypes.TEXT,
//       allowNull: true,
//     },
//     likelihood: {
//       type: DataTypes.INTEGER,
//       defaultValue: 1,
//       validate: { min: 1, max: 5 },
//     },
//     severity: {
//       type: DataTypes.INTEGER,
//       defaultValue: 1,
//       validate: { min: 1, max: 5 },
//     },
//     risk_score: {
//       type: DataTypes.VIRTUAL,
//       get() {
//         return this.likelihood * this.severity;
//       },
//     },
//     risk_level: {
//       type: DataTypes.VIRTUAL,
//       get() {
//         const score = this.likelihood * this.severity;
//         if (score >= 15) return "High";
//         if (score >= 9) return "Medium";
//         return "Low";
//       },
//     },
//   },
//   {
//     tableName: "project_modules",
//     timestamps: true,
//   }
// );

// module.exports = { ProjectModule };
