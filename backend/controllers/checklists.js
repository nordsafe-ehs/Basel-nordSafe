const { Checklists, Projects } = require("../models");

const getChecklists = async (req, res) => {
  const { name, projectId } = req.query;

  if (!name) return res.status(400).json({ message: "Name is required" });

  try {
    const checklists = await Checklists.findAll({
      where: {
        name,
        ProjectId: projectId,
      },
      include: [Projects],
    });

    const response = checklists.map(({ data, Project, id }) => {
      const parsedData = JSON.parse(data);

      const convertedData = Object.fromEntries(
        Object.entries(parsedData).map(([key, value]) => [
          key,
          typeof value === "boolean" ? (value ? "Yes" : "No") : value,
        ])
      );

      return {
        ...convertedData,
        id,
        project: Project.name,
      };
    });

    res.json(response);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch" });
  }
};

const createChecklist = async (req, res) => {
  const { name, projectId } = req.query;

  if (!projectId)
    return res.status(400).json({ message: "Project id is required" });
  if (!name) return res.status(400).json({ message: "Name is required" });

  try {
    await Checklists.create({
      name,
      data: req.body,
      ProjectId: projectId,
    });

    res.status(201).json({ message: "Checklist created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to create" });
  }
};

module.exports = { getChecklists, createChecklist };
