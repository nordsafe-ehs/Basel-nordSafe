const express = require("express");
const router = express.Router();
const { getChecklists, createChecklist } = require("../controllers/checklists");
const authMiddleware = require("../middleware/authMiddleware");

router.use(authMiddleware);

router.get("/", getChecklists);

router.post("/", createChecklist);

module.exports = router;
