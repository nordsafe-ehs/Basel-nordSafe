const express = require("express");
const router = express.Router();
const {
  getUsers,
  createUser,
  deleteUser,
  login,
  register,
} = require("../controllers/users");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, getUsers);

router.post("/", authMiddleware, createUser);

router.delete("/", authMiddleware, deleteUser);

router.post("/login", login);

router.post("/register", register);

module.exports = router;
