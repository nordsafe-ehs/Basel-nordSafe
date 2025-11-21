const { Users, EntranceLog, Projects } = require("../models");

const getEntrancesLogs = async (req, res) => {
  const permissions = ["admin", "super-admin"];
  if (!permissions.includes(req.user?.role))
    return res.status(403).json({ message: "Forbidden" });

  const { projectId } = req.query;

  try {
    const entranceLogs = await EntranceLog.findAll({
      where: {
        ProjectId: projectId,
      },
      include: {
        model: Users,
        attributes: {
          exclude: ["password"],
        },
      },
    });

    res.json(
      entranceLogs.map((log) => ({ ...log, fullname: log.User.fullname }))
    );
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch", err: err.message });
  }
};

const addEntranceLog = async (req, res) => {
  const { ProjectId } = req.body;

  try {
    const exists = await Projects.findByPk(ProjectId);

    if (!exists) return res.status(404).json({ message: "Project not found" });

    const entrancesLogs = await EntranceLog.findAll({
      where: {
        ProjectId,
        UserId: req.user.id,
      },
    });

    if (entrancesLogs.length < 1) {
      await EntranceLog.create({
        ProjectId,
        UserId: req.user.id,
        inTime: new Date(),
      });
      return res.json({ message: "Your entrance log signed" });
    }
    const lastLog = entrancesLogs[entrancesLogs.length - 1];
    const interval = new Date().getTime() - new Date(lastLog.inTime).getTime();

    if (interval < 60 * 60 * 1000)
      return res.status(400).json({
        message: "You have already signed in recently",
      });

    if (interval > 12 * 60 * 60 * 1000 || lastLog.outTime) {
      await EntranceLog.create({
        ProjectId,
        UserId: req.user.id,
        inTime: new Date(),
      });
      return res.json({ message: "Your entrance log signed" });
    }

    await EntranceLog.update(
      {
        outTime: new Date(),
      },
      {
        where: {
          id: lastLog.id,
        },
      }
    );

    res.json({ message: "Your entrance log signed" });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch", err: err.message });
  }
};

const updateEntranceLog = async (req, res) => {
  const permissions = ["admin", "super-admin"];
  if (!permissions.includes(req.user?.role))
    return res.status(403).json({ message: "Forbidden" });

  const { id, time, type } = req.body;
  if (!id) return res.status(400).json({ message: "Missing entrance log ID" });
  if (!time) return res.status(400).json({ message: "Missing time" });
  if (!type) return res.status(400).json({ message: "Missing type" });

  try {
    const entranceLogs = await EntranceLog.findByPk(id);
    if (!entranceLogs)
      return res.status(404).json({ message: "Entrance log not found" });

    await EntranceLog.update(
      {
        [type == "extra" ? "extraTime" : "outTime"]: new Date(time),
      },
      {
        where: {
          id,
        },
      }
    );

    res.json({ message: "Entrance log updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch", err: err.message });
  }
};

module.exports = { getEntrancesLogs, addEntranceLog, updateEntranceLog };
