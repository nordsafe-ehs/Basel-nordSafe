const express = require("express");
const router = express.Router();
const { RiskEvaluation } = require("../models");
const authMiddleware = require("../middleware/authMiddleware");

router.use(authMiddleware);

// 🔎 دالة مساعدة لحساب القيم
function calculateRiskLevels(body) {
  const baseLikelihood = Number(body.base_likelihood) || 0;
  const baseSeverity = Number(body.base_severity) || 0;
  const residualLikelihood = Number(body.residual_likelihood) || 0;
  const residualSeverity = Number(body.residual_severity) || 0;

  const baseScore = baseLikelihood * baseSeverity;
  const residualScore = residualLikelihood * residualSeverity;

  const baseLevel =
    baseScore >= 15 ? "High" : baseScore >= 9 ? "Medium" : "Low";
  const residualLevel =
    residualScore >= 15 ? "High" : residualScore >= 9 ? "Medium" : "Low";

  return {
    ...body,
    base_risk_score: baseScore,
    base_risk_level: baseLevel,
    residual_risk_score: residualScore,
    residual_risk_level: residualLevel,
  };
}

// ✅ GET all evaluations
router.get("/", async (req, res) => {
  try {
    const evaluations = await RiskEvaluation.findAll({
      order: [["id", "ASC"]],
    });
    return res.json({ success: true, data: evaluations });
  } catch (err) {
    console.error("Fetch error:", err);
    return res
      .status(500)
      .json({
        success: false,
        error: "Failed to fetch evaluations",
        details: err.message,
      });
  }
});

// ✅ GET single evaluation
router.get("/:id", async (req, res) => {
  try {
    const evaluation = await RiskEvaluation.findByPk(req.params.id);
    if (!evaluation)
      return res.status(404).json({ success: false, error: "Not found" });
    return res.json({ success: true, data: evaluation });
  } catch (err) {
    console.error("Fetch single error:", err);
    return res
      .status(500)
      .json({
        success: false,
        error: "Failed to fetch evaluation",
        details: err.message,
      });
  }
});

// ✅ POST new evaluation (مع حساب تلقائي)
router.post("/", async (req, res) => {
  try {
    console.log("Received payload:", req.body);
    const payload = calculateRiskLevels(req.body);
    const evaluation = await RiskEvaluation.create(payload);
    return res
      .status(201)
      .json({
        success: true,
        message: "Evaluation created successfully",
        data: evaluation,
      });
  } catch (err) {
    console.error("Error creating evaluation:", err);
    return res
      .status(400)
      .json({
        success: false,
        error: "Failed to create evaluation",
        details: err.message,
      });
  }
});

// ✅ PUT update evaluation (مع حساب تلقائي)
router.put("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id))
      return res.status(400).json({ success: false, error: "Invalid id" });

    const payload = calculateRiskLevels(req.body);
    const [updated] = await RiskEvaluation.update(payload, { where: { id } });
    if (!updated)
      return res.status(404).json({ success: false, error: "Not found" });

    const evaluation = await RiskEvaluation.findByPk(id);
    return res.json({
      success: true,
      message: "Updated successfully",
      data: evaluation.toJSON(),
    });
  } catch (err) {
    console.error("Update error:", err);
    return res
      .status(500)
      .json({
        success: false,
        error: "Failed to update evaluation",
        details: err.message,
      });
  }
});

// ✅ DELETE evaluation
router.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id))
      return res.status(400).json({ success: false, error: "Invalid id" });

    const deleted = await RiskEvaluation.destroy({ where: { id } });
    if (!deleted)
      return res.status(404).json({ success: false, error: "Not found" });

    return res.json({ success: true, message: "Deleted successfully", id });
  } catch (err) {
    console.error("Delete error:", err);
    return res
      .status(500)
      .json({
        success: false,
        error: "Failed to delete evaluation",
        details: err.message,
      });
  }
});

module.exports = router;
