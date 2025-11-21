const { Op } = require("sequelize");
const { Reports } = require("../models");
const { default: axios } = require("axios");

const getChartData = async (req, res) => {
  const { projectId, type, year } = req.query;
  try {
    const startDate = new Date(`${year}-01-01T00:00:00.000Z`);
    const endDate = new Date(`${Number(year) + 1}-01-01T00:00:00.000Z`);

    const reports = await Reports.findAll({
      where: {
        ProjectId: projectId,
        type,
        createdAt: {
          [Op.gte]: startDate,
          [Op.lt]: endDate,
        },
      },
    });

    const addCount = (obj, date) => {
      obj[date] = (obj[date] || 0) + 1;
    };

    const typeKey =
      type == "deviations"
        ? "type_of_deviation"
        : type == "case-investigations"
        ? "type"
        : "";

    const tmpReportsMap = {};
    reports.forEach((report) => {
      const type = typeKey ? JSON.parse(report.data)[typeKey] : "";
      if (!tmpReportsMap[type]) tmpReportsMap[type] = [];
      tmpReportsMap[type].push(report);
    });

    const reportsMap = {};

    for (const type in tmpReportsMap) {
      if (Object.prototype.hasOwnProperty.call(tmpReportsMap, type)) {
        const items = {};
        tmpReportsMap[type].forEach((report) => {
          const date = `${new Date(report.createdAt).getFullYear()}/${new Date(
            report.createdAt
          ).getMonth()}`;
          addCount(items, date);
        });
        reportsMap[type] = items;
      }
    }

    res.json(reportsMap);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch" });
  }
};

const getHomeData = async (req, res) => {
  const { projectId } = req.query;
  try {
    const reports = await Reports.findAll({
      where: {
        ProjectId: projectId,
      },
    });

    res.json({
      deviations: reports.filter((report) => report.type == "deviations")
        .length,
      "site-monitoring": reports.filter(
        (report) => report.type == "site-monitoring"
      ).length,
      "case-investigations": reports.filter(
        (report) => report.type == "case-investigations"
      ).length,
    });
  } catch (err) {
    console.log(err.message);

    res.status(500).json({ message: "Failed to fetch" });
  }
};

const getCompanyName = async (req, res) => {
  const { orgNumber } = req.body;
  try {
    const { data } = await axios.get(
      `https://data.brreg.no/enhetsregisteret/api/enheter/${orgNumber}`
    );
    return res.json({
      name: data.navn || "",
      email: data.epostadresse || "",
      phoneNumber: data.telefon || "",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Failed to fetch company name",
      err: err.message,
      name: "",
      email: "",
      phoneNumber: "",
    });
  }
};

module.exports = { getChartData, getHomeData, getCompanyName };
