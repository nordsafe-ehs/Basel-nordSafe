const express = require("express");
const RiskAssessment = require("../models/RiskEvaluation");

const router = express.Router();

function calculateRisk(likelihood, severity) {
  const l = Number(likelihood);
  const s = Number(severity);
  const riskScore = l * s;

  let riskRating = "Low";
  if (riskScore >= 15) riskRating = "High";
  else if (riskScore >= 8) riskRating = "Medium";

  return { riskScore, riskRating };
}

function calculateResidualRisk(residualLikelihood, residualSeverity) {
  const l = Number(residualLikelihood);
  const s = Number(residualSeverity);
  const riskScore = l * s;

  let riskRating = "Low";
  if (riskScore >= 15) riskRating = "High";
  else if (riskScore >= 8) riskRating = "Medium";

  return { riskScore, riskRating };
}

// 🟢 Get all risk assessments
router.get("/", async (req, res) => {
  try {
    const risks = await RiskAssessment.findAll();
    res.json(risks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🟢 Get single risk assessment by ID
router.get("/:id", async (req, res) => {
  try {
    const risk = await RiskAssessment.findByPk(req.params.id);
    if (!risk)
      return res.status(404).json({ error: "Risk assessment not found" });
    res.json(risk);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🟢 Create new risk assessment
// router.post("/", async (req, res) => {
//   try {
//     const risk = await RiskAssessment.create(req.body);
//     res.status(201).json(risk);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// // 🟢 Update risk assessment
// router.put("/:id", async (req, res) => {
//   try {
//     const [updated] = await RiskAssessment.update(req.body, {
//       where: { id: req.params.id },
//     });

//     if (!updated) {
//       return res.status(404).json({ error: "Risk assessment not found" });
//     }

//     // ✅ رجّع الصف المحدث
//     const updatedRow = await RiskAssessment.findByPk(req.params.id);
//     return res.json(updatedRow);
//   } catch (err) {
//     console.error("err update is", err);
//     res.status(400).json({ error: err.message });
//   }
// });

router.put("/:id", async (req, res) => {
  try {
    const {
      likelihood,
      severity,
      residualLikelihood,
      residualSeverity,
      ...rest
    } = req.body;

    const { riskScore, riskRating } = calculateRisk(likelihood, severity);
    const { riskScore: residualRiskScore, riskRating: residualRiskRating } =
      calculateResidualRisk(residualLikelihood, residualSeverity);

    await RiskAssessment.update(
      {
        ...rest,
        likelihood,
        severity,
        riskScore,
        riskRating,
        residualLikelihood,
        residualSeverity,
        residualRiskScore,
        residualRiskRating,
      },
      { where: { id: Number(req.params.id) } }
    );

    const updatedRow = await RiskAssessment.findByPk(req.params.id);
    res.json(updatedRow);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      likelihood,
      severity,
      residualLikelihood,
      residualSeverity,
      ...rest
    } = req.body;

    const { riskScore, riskRating } = calculateRisk(likelihood, severity);
    const { riskScore: residualRiskScore, riskRating: residualRiskRating } =
      calculateResidualRisk(residualLikelihood, residualSeverity);

    const newRisk = await RiskAssessment.create({
      ...rest,
      likelihood,
      severity,
      riskScore,
      riskRating,
      residualLikelihood,
      residualSeverity,
      residualRiskScore,
      residualRiskRating,
    });

    res.json(newRisk);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🟢 Delete risk assessment
// داخل الراوتر
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await RiskAssessment.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.status(204).send();
  } catch (err) {
    console.error("Delete error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const [updated] = await RiskAssessment.update(req.body, {
      where: { id: req.params.id },
    });

    if (!updated) {
      return res.status(404).json({ error: "Risk assessment not found" });
    }

    // رجّع البيانات المحدثة (اختياري: اعمل findByPk مرة ثانية)
    const risk = await RiskAssessment.findByPk(req.params.id);
    res.json(risk);
  } catch (err) {
    console.error("err update is", err);
    res.status(400).json({ error: err.message });
  }
});

// داخل router
router.get("/chart", async (req, res) => {
  try {
    const risks = await RiskAssessment.findAll({
      attributes: ["revisionDate", "riskScore", "residualRiskScore"],
      order: [["revisionDate", "ASC"]],
    });

    const formatted = [
      {
        id: "Risk Score",
        color: "#003f5c",
        data: risks.map((r) => ({
          x: r.revisionDate,
          y: r.riskScore,
        })),
      },
      {
        id: "Residual Risk",
        color: "#0CB283",
        data: risks.map((r) => ({
          x: r.revisionDate,
          y: r.residualRiskScore,
        })),
      },
    ];

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});





module.exports = router;
