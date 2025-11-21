const express = require("express");
const router = express.Router();
const {
  getProjects,
  createProject,
  deleteProject,
  users,
} = require("../controllers/projects");
const authMiddleware = require("../middleware/authMiddleware");

router.use(authMiddleware);

router.get("/", getProjects);

router.post("/",createProject);

router.delete("/", deleteProject);

router.post("/users", users);

module.exports = router;
