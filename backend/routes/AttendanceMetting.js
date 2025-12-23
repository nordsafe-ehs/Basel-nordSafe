const express = require("express");
const router = express.Router();
const Attendance = require("../models/AttendanceMetting");

// ✅ جلب كل سجلات الحضور لاجتماع محدد
router.get("/meeting/:meetingId", async (req, res) => {
  try {
    const attendances = await Attendance.findAll({
      where: { meetingId: req.params.meetingId },
    });
    res.json(attendances);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ جلب سجل حضور واحد
router.get("/:id", async (req, res) => {
  try {
    const attendance = await Attendance.findByPk(req.params.id);
    if (!attendance) {
      return res.status(404).json({ error: "Attendance not found" });
    }
    res.json(attendance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ إضافة مشارك جديد
router.post("/", async (req, res) => {
  try {
    const newAttendance = await Attendance.create(req.body);
    res.status(201).json(newAttendance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ تعديل بيانات مشارك
router.put("/:id", async (req, res) => {
  try {
    const [updated] = await Attendance.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updated) {
      return res.status(404).json({ error: "Attendance not found" });
    }
    const updatedAttendance = await Attendance.findByPk(req.params.id);
    res.json(updatedAttendance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ حذف مشارك
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Attendance.destroy({
      where: { id: req.params.id },
    });
    if (!deleted) {
      return res.status(404).json({ error: "Attendance not found" });
    }
    res.json({ message: "Attendance deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
