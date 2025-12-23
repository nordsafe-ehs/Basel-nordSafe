const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Attachment = require("../models/AttechmentsMetting");
const MeetingDetails = require("../models/MeetingDetails");

// إعداد التخزين للملفات
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// ✅ خدمة الملفات بشكل مباشر
// ضيف هذا في ملف السيرفر الرئيسي (app.js أو server.js)
const app = express();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ جلب المرفقات
router.get("/", async (req, res) => {
  try {
    const { meetingId } = req.query;
    const attachments = await Attachment.findAll({
      where: { meetingId },
      order: [["createdAt", "DESC"]],
    });
    res.json(attachments);
  } catch (err) {
    console.error("Error fetching attachments:", err);
    res.status(500).json({ error: "Error fetching attachments" });
  }
});

// Route لتحميل الملف
// Route لتحميل الملف
router.get("/:id/download", async (req, res) => {
  try {
    const att = await Attachment.findByPk(req.params.id);
    if (!att) return res.status(404).send("Attachment not found");

    // المسار الفعلي للملف
    const filePath = path.join(__dirname, "../uploads/uploads", att.filePath.replace("/uploads/", ""));

    // إرسال الملف للتحميل
    res.download(filePath, att.documentName);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error downloading file");
  }
});


// ✅ إنشاء مرفق جديد مع رفع ملف
// router.post("/", upload.single("file"), async (req, res) => {
//   try {
//     const { documentName, member, meetingId } = req.body;

//     // تحقق من وجود الاجتماع
//     const meeting = await MeetingDetails.findByPk(meetingId);
//     if (!meeting) {
//       return res.status(404).json({ error: "Meeting not found" });
//     }

//     const filePath = req.file ? `/uploads/${req.file.filename}` : null;

//     const attachment = await Attachment.create({
//       documentName: documentName || (req.file ? req.file.originalname : null), // ✅ إذا ما أرسلت documentName ناخده من اسم الملف
//       member,
//       meetingId,
//       filePath,
//     });

//     res.json(attachment);
//   } catch (error) {
//     console.error("Error creating attachment:", error);
//     res.status(500).json({ error: "Error creating attachment" });
//   }
// });
router.post("/", async (req, res) => {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const uploadedFile = req.files.file;
    const filePath = `/uploads/${Date.now()}_${uploadedFile.name}`;
    await uploadedFile.mv(path.join(__dirname, "../uploads", filePath));

    const attachment = await Attachment.create({
      documentName: req.body.documentName || uploadedFile.name,
      member: req.body.member,
      meetingId: req.body.meetingId,
      filePath,
    });

    res.json(attachment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ حذف مرفق
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Attachment.destroy({ where: { id: req.params.id } });
    if (!deleted) {
      return res.status(404).json({ error: "Attachment not found" });
    }
    res.json({ message: "Attachment deleted successfully" });
  } catch (err) {
    console.error("Error deleting attachment:", err);
    res.status(500).json({ error: "Error deleting attachment" });
  }
});


module.exports = router;
