const express = require("express");
const router = express.Router();
const {
  getReports,
  createReport,
  getReport,
  updateReportStatus,
  updateReport,
} = require("../controllers/reports");
const authMiddleware = require("../middleware/authMiddleware");

router.use(authMiddleware);

router.get("/", getReports);

router.post("/", createReport);

router.patch("/", updateReport);

router.get("/:id", getReport);

router.patch("/status", updateReportStatus);

module.exports = router;
