const express = require("express");
const router = express.Router();
const MeetingDetails = require("../models/MeetingDetails");
const AgendaItem = require("../models/AgendaItemMetting");

// Get all meetings
router.get("/", async (req, res) => {
  try {
    const meetings = await MeetingDetails.findAll({
      include: [
        { model: AgendaItem, as: "agendaItems" },
        // { model: CaseItem, as: "caseItems" },
      ],
    });
    res.json(meetings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get meeting by ID
router.get("/:id", async (req, res) => {
  try {
    const meeting = await MeetingDetails.findByPk(req.params.id, {
      include: [
        { model: AgendaItem, as: "agendaItems" },
        // { model: CaseItem, as: "caseItems" },
      ],
    });

    if (!meeting) {
      return res.status(404).json({ error: "Meeting not found" });
    }

    res.json(meeting);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create meeting
router.post("/", async (req, res) => {
  try {
    const meeting = await MeetingDetails.create(req.body);
    res.status(201).json(meeting); // رجع الـ meeting مباشرة
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// Update meeting
router.put("/:id", async (req, res) => {
  try {
    const [updated] = await MeetingDetails.update(req.body, {
      where: { id: req.params.id },
    });

    if (!updated) {
      return res.status(404).json({ error: "Meeting not found" });
    }

    const updatedMeeting = await MeetingDetails.findByPk(req.params.id);

    res.json(updatedMeeting); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Delete meeting
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await MeetingDetails.destroy({
      where: { id: req.params.id },
    });
    if (!deleted) {
      return res.status(404).json({ error: "Meeting not found" });
    }
    res.json({ message: "Meeting deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
