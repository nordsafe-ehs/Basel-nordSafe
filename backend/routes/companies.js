const express = require("express");
const router = express.Router();
const {
  getChartData,
  getHomeData,
  getCompanyName,
} = require("../controllers/companies");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/chart", authMiddleware, getChartData);

router.get("/", authMiddleware, getHomeData);

router.post("/company-name", getCompanyName);

module.exports = router;
