const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  getEntrancesLogs,
  addEntranceLog,
  updateEntranceLog,
} = require("../controllers/entrance-log");

router.use(authMiddleware);

router.get("/", getEntrancesLogs);

router.post("/", addEntranceLog);

router.patch("/", updateEntranceLog);

module.exports = router;
