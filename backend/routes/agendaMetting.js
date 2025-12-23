const express = require("express");
const router = express.Router();
const AgendaItem = require("../models/AgendaItemMetting");
const MeetingDetails = require("../models/MeetingDetails"); // ✅ لازم تستورد الموديل

// Get agenda items for a specific meeting
router.get("/meeting/:meetingId", async (req, res) => {
  try {
    const items = await AgendaItem.findAll({
      where: { meetingId: req.params.meetingId },
    });
    res.json(items);
  } catch (err) {
    console.error("error is ", err);
    res.status(500).json({ error: err.message });
  }
});

// Create agenda item
router.post("/", async (req, res) => {
  try {
    const { itemNumber, meetingId, title, responsible, description } = req.body;
    if (!meetingId || !title) {
      return res
        .status(400)
        .json({ error: "meetingId and title are required" });
    }

    const meeting = await MeetingDetails.findByPk(meetingId);
    if (!meeting) {
      return res.status(404).json({ error: "Meeting not found" });
    }

    const item = await AgendaItem.create({
      itemNumber,
      title,
      responsible,
      description,
      meetingId,
    });
    res.status(201).json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Update agenda item
router.put("/:id", async (req, res) => {
  try {
    const [updated] = await AgendaItem.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updated) {
      return res.status(404).json({ error: "Agenda item not found" });
    }
    const updatedItem = await AgendaItem.findByPk(req.params.id);
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete agenda item
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await AgendaItem.destroy({ where: { id: req.params.id } });
    if (!deleted) {
      return res.status(404).json({ error: "Agenda item not found" });
    }
    res.json({ message: "Agenda item deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
