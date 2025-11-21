// routes/meetingRoutes.js
const express = require("express");
const router = express.Router();
const {
  createMeeting,
  getMeetings,
  getMeetingById,
  updateMeeting,
  deleteMeeting,
} = require("../controllers/meetingController");

// 📌 إضافة اجتماع جديد مع الأجندة والقرارات والإجراءات
router.post("/", createMeeting);

// 📌 جلب كل الاجتماعات
router.get("/", getMeetings);

// 📌 جلب اجتماع محدد عبر الـ id
router.get("/:id", getMeetingById);

// 📌 تحديث اجتماع محدد
router.put("/:id", updateMeeting);

// 📌 حذف اجتماع محدد
router.delete("/:id", deleteMeeting);

module.exports = router;
