// // routes/participants.js
// const express = require("express");
// const Participant = require("../models/RiskParticipant");

// const router = express.Router();

// // 🟢 Get all participants
// router.get("/", async (req, res) => {
//   try {
//     const participants = await Participant.findAll();
//     res.json(participants);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // 🟢 Get participants by riskAssessmentId
// router.get("/:riskAssessmentId", async (req, res) => {
//   try {
//     const participants = await Participant.findAll({
//       where: { riskAssessmentId: req.params.riskAssessmentId },
//     });
//     res.json(participants);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // 🟢 Add new participant
// router.post("/", async (req, res) => {
//   try {
//     const participant = await Participant.create({
//       ...req.body,
//       riskAssessmentId: req.params.riskAssessmentId,
//     });
//     res.status(201).json(participant);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// // 🟢 Update participant (مثلاً توقيع أو بيانات)
// router.put("/:id", async (req, res) => {
//   try {
//     await Participant.update(req.body, { where: { id: req.params.id } });
//     const updated = await Participant.findByPk(req.params.id);
//     if (!updated)
//       return res.status(404).json({ error: "Participant not found" });
//     res.json(updated);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// // 🟢 Delete participant
// router.delete("/:id", async (req, res) => {
//   try {
//     const deleted = await Participant.destroy({ where: { id: req.params.id } });
//     if (!deleted)
//       return res.status(404).json({ error: "Participant not found" });
//     res.status(204).send();
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });


// // 🟢 Get only name and position for all participants
// router.get("/basic", async (req, res) => {
//   try {
//     const participants = await Participant.findAll({
//       where: { riskAssessmentId: req.params.riskAssessmentId },
//       attributes: ["name", "position"], // ✅ فقط الحقول المطلوبة
//     });
//     res.json(participants);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });


// module.exports = router;




// routes/participants.js
const express = require("express");
const Participant = require("../models/RiskParticipant");

const router = express.Router();

// 🟢 Get all participants (مستقل)
router.get("/", async (req, res) => {
  try {
    const participants = await Participant.findAll();
    res.json(participants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🟢 Get participants by riskAssessmentId (اختياري)
// routes/participants.js
router.get("/byDoc/:documentId", async (req, res) => {
  try {
    const participants = await Participant.findAll({
      where: { documentId: req.params.documentId },
    });
    res.json(participants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// 🟢 Add new participant (مستقل، والـ riskAssessmentId إذا موجود يجي من الـ body)
router.post("/", async (req, res) => {
  try {
    const participant = await Participant.create(req.body);
    res.status(201).json(participant);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🟢 Update participant
router.put("/:id", async (req, res) => {
  try {
    await Participant.update(req.body, { where: { id: req.params.id } });
    const updated = await Participant.findByPk(req.params.id);
    if (!updated)
      return res.status(404).json({ error: "Participant not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🟢 Delete participant
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Participant.destroy({ where: { id: req.params.id } });
    if (!deleted)
      return res.status(404).json({ error: "Participant not found" });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🟢 Get only name and position (مستقل)
router.get("/basic", async (req, res) => {
  try {
    const participants = await Participant.findAll({
      attributes: ["id", "name", "position", "signatureUrl"],
    });
    res.json(participants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
