const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const RiskEvaluation = sequelize.define(
  "RiskEvaluation",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    company_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    document_reference: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    rev_no: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    rev_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    assessed_by: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: "Safety Officer",
    },

    signature: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    // ✅ جدول الأنشطة والمخاطر
    activity_name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    identified_hazards: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    people_involved: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    // Base Risk
    base_likelihood: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    base_severity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    base_risk_score: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    base_risk_level: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },

    control_measures: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    // Residual Risk
    residual_likelihood: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    residual_severity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    residual_risk_score: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    residual_risk_level: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },

    person_responsible: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    tableName: "risk_evaluations",
    timestamps: true,
  }
);

module.exports = { RiskEvaluation };
