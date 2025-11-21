const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  getSubscriptionDetails,
  webhook,
} = require("../controllers/subscriptions");

router.get("/", authMiddleware, getSubscriptionDetails);

router.post("/webhook", express.raw({ type: "application/json" }), webhook);

module.exports = router;
