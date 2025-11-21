const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { searchSDS, getSDS, saveSDS } = require("../controllers/sds");

router.use(authMiddleware);

router.post("/search", searchSDS);

router.get("/", getSDS);

router.post("/", saveSDS);

module.exports = router;
