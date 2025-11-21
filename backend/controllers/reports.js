const { Op } = require("sequelize");
const { Users, AssignReport, Reports } = require("../models");
const uploadFile = require("../utils/uploadFile");

const getReports = async (req, res) => {
  const { type, projectId } = req.query;
  if (type === undefined)
    return res.status(400).json({ message: "Type is required" });

  try {
    const reports = await Reports.findAll({
      where: {
        type,
        ProjectId: projectId,
      },
      include: [
        {
          model: AssignReport,
        },
      ],
    });

    res.json(
      reports.map(({ data, id, AssignReports }) => ({
        ...JSON.parse(data),
        id,
        status: ["Open", "In Progress", "Closed"].find((s) =>
          AssignReports.some((r) => r.status === s)
        ),
      }))
    );
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch" });
  }
};

const getReport = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "Id is required" });

  try {
    const report = await Reports.findByPk(id);
    const assignReport = await AssignReport.findAll({
      where: {
        ReportId: id,
      },
      include: [
        {
          model: Users,
          attributes: {
            exclude: ["password", "createdAt", "updatedAt"],
          },
        },
      ],
    });

    const fullnames = {};

    for (const i in assignReport) {
      if (Object.prototype.hasOwnProperty.call(assignReport, i)) {
        const item = assignReport[i];
        if (item.User && item) {
          fullnames[item.UserId] = {};
          fullnames[item.UserId].fullname = item.User.fullname;
          fullnames[item.UserId].status = item.status;
        }
      }
    }

    const data = {};

    for (const key in JSON.parse(report.data)) {
      if (Object.prototype.hasOwnProperty.call(JSON.parse(report.data), key)) {
        const value = JSON.parse(report.data)[key];
        if (key.includes("assign_to")) {
          const match = key.match(/--(\d+)/);
          if (fullnames[value]) {
            data[`status${match ? "--" + match[1] : ""}`] =
              fullnames[value].status;
            data[key] = {
              value: fullnames[value].fullname,
              id: value,
            };
            continue;
          }
        }
        data[key] = value;
      }
    }

    res.json({
      assignReport: assignReport.map(({ status, id, User: { fullname } }) => ({
        status,
        id,
        fullname,
      })),
      data: {
        ...data,
        id: report.id,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch", err: err.message });
  }
};

const createReport = async (req, res) => {
  const { type, projectId } = req.query;
  if (!type) return res.status(400).json({ message: "Type is required" });
  if (!projectId)
    return res.status(400).json({ message: "Project id is required" });

  try {
    const filesData = await uploadFile(req.files);

    const reportData = { ...req.body, ...filesData };

    const createdReport = await Reports.create({
      type,
      data: reportData,
      ProjectId: projectId,
    });

    // handle assign_to fields
    for (const key in reportData) {
      if (key.includes("assign_to")) {
        await AssignReport.create({
          ReportId: createdReport.id,
          UserId: reportData[key],
        });
      }
    }

    res.status(201).json({ message: "Report created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message || "Failed to create" });
  }
};

const updateReport = async (req, res) => {
  const { projectId, editId } = req.query;
  if (!projectId)
    return res.status(400).json({ message: "Project id is required" });
  if (!editId) return res.status(400).json({ message: "Edit id is required" });

  try {
    const report = await Reports.findByPk(editId);
    if (!report) return res.status(404).json({ message: "Report not found" });

    const assignReports = await AssignReport.findAll({
      where: {
        ReportId: editId,
      },
    });

    const assignArr = [];

    for (const key in req.body) {
      if (Object.prototype.hasOwnProperty.call(req.body, key)) {
        const value = req.body[key];
        if (key.includes("assign_to")) {
          assignArr.push({
            ReportId: report.id,
            UserId: value,
          });
        }
      }
    }

    const existingUserIds = assignReports.map((report) => report.UserId);
    const newUserIds = assignArr.map((report) => report.UserId);

    const usersToRemove = existingUserIds.filter(
      (id) => !newUserIds.includes(id)
    );
    const usersToAdd = newUserIds.filter((id) => !existingUserIds.includes(id));

    if (usersToRemove.length > 0)
      await AssignReport.destroy({
        where: {
          ReportId: report.id,
          UserId: {
            [Op.in]: usersToRemove,
          },
        },
      });

    await AssignReport.bulkCreate(
      usersToAdd.map((UserId) => ({
        ReportId: report.id,
        UserId,
      }))
    );

    await Reports.update(
      {
        data: req.body,
        ProjectId: projectId,
      },
      {
        where: {
          id: editId,
        },
      }
    );

    res.status(201).json({ message: "Report updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to create" });
  }
};

const updateReportStatus = async (req, res) => {
  try {
    if (!Array.isArray(req.body))
      return res.status(400).json({ message: "Something went wrong" });

    for (let i = 0; i < req.body.length; i++) {
      const { status, id } = req.body[i];

      await AssignReport.update(
        {
          status,
        },
        {
          where: {
            id,
          },
        }
      );
    }

    res.status(201).json({ message: "Report updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to create" });
  }
};

module.exports = {
  getReports,
  createReport,
  getReport,
  updateReportStatus,
  updateReport,
};
