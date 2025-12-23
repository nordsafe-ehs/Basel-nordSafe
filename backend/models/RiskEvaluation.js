const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Participant = require('./RiskParticipant')

const RiskAssessment = sequelize.define("RiskAssessment", {
  //headers

 

  // signatureUrl: { type: DataTypes.TEXT, allowNull: true },

 

  //activity details
  activity: { type: DataTypes.TEXT, allowNull: true },
  hazards: { type: DataTypes.TEXT, allowNull: true },

  likelihood: { type: DataTypes.INTEGER, defaultValue: 1 },
  severity: { type: DataTypes.INTEGER, defaultValue: 1 },
  riskScore: { type: DataTypes.INTEGER, defaultValue: 1 },
  riskRating: {
    type: DataTypes.ENUM,
    values: ["Low", "Medium", "High"],
    defaultValue: "Low",
  },
  controlMeasures: { type: DataTypes.TEXT },
  residualLikelihood: { type: DataTypes.INTEGER, defaultValue: 1 },
  residualSeverity: { type: DataTypes.INTEGER, defaultValue: 1 },
  residualRiskScore: { type: DataTypes.INTEGER, defaultValue: 1 },
  residualRiskRating: {
    type: DataTypes.ENUM,
    values: ["Low", "Medium", "High"],
    defaultValue: "Low",
  },
  responsiblePerson: { type: DataTypes.STRING },
});





// ✅ دالة لحساب المستوى من الـ score
function calculateRiskLevel(score) {
  if (score <= 5) return "Low";
  if (score <= 12) return "Medium";
  return "High";
}

// ✅ Hook واحد يغطي الإنشاء والتحديث
RiskAssessment.beforeSave((risk) => {
  // Base Risk
  const l = risk.getDataValue("likelihood");
  const s = risk.getDataValue("severity");
  risk.setDataValue("riskScore", l * s);
  risk.setDataValue("riskRating", calculateRiskLevel(l * s));

  // Residual Risk
  const rl = risk.getDataValue("residualLikelihood");
  const rs = risk.getDataValue("residualSeverity");
  if (rl && rs) {
    risk.setDataValue("residualRiskScore", rl * rs);
    risk.setDataValue("residualRiskRating", calculateRiskLevel(rl * rs));
  }
});

module.exports = RiskAssessment;
