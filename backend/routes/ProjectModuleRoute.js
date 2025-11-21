// // routes/project-modules.js
// const express = require("express");
// const router = express.Router();
// const { ProjectModule } = require("../models");

// // إنشاء بند جديد
// router.post("/", async (req, res) => {
//   try {
//     const module = await ProjectModule.create(req.body);
//     res.status(201).json(module);
//   } catch (err) {
//     console.error("Create error:", err);
//     res.status(500).json({ error: "Failed to create module" });
//   }
// });

// // جلب كل البنود
// router.get("/", async (req, res) => {
//   try {
//     const modules = await ProjectModule.findAll({ order: [["id", "ASC"]] });
//     res.json(modules);
//   } catch (err) {
//     console.error("Fetch error:", err);
//     res.status(500).json({ error: "Failed to fetch modules" });
//   }
// });

// // تعديل بند
// router.put("/:id", async (req, res) => {
//   try {
//     const updated = await ProjectModule.update(req.body, {
//       where: { id: req.params.id },
//     });
//     res.json({ message: "Module updated successfully" });
//   } catch (err) {
//     console.error("Update error:", err);
//     res.status(500).json({ error: "Failed to update module" });
//   }
// });

// // حذف بند
// router.delete("/:id", async (req, res) => {
//   try {
//     await ProjectModule.destroy({ where: { id: req.params.id } });
//     res.json({ message: "Module deleted successfully" });
//   } catch (err) {
//     console.error("Delete error:", err);
//     res.status(500).json({ error: "Failed to delete module" });
//   }
// });

// module.exports = router;
