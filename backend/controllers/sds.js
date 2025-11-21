const { default: axios } = require("axios");
const fs = require("fs");
const path = require("path");
const { Companies, Plans, BasePlans, SDS } = require("../models");

const PROXY_BASE_URL = "https://nordsafe-sds-proxy.vercel.app/api";

const getSDS = async (req, res) => {
  const { projectId } = req.query;

  if (!projectId)
    return res.status(400).json({ message: "Project id is required" });

  try {
    const sds = await SDS.findAll({
      where: {
        ProjectId: projectId,
      },
    });
    res.json(sds);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch" });
  }
};

const searchSDS = async (req, res) => {
  const { product_name, page, pageSize, language } = req.body;
  if (!product_name)
    return res.status(400).json({ message: "Product name is required" });

  const requestData = {
    language,
    limit_val: pageSize,
    offset_val: page,
    product_name,
    issue_date: "",
    country: "",
    cas_no: "",
    mfg_name: "",
    msds_id: "",
    product_code: "",
    sortfield: "issue_date",
    sortdir: "desc",
  };

  try {
    const company = await Companies.findByPk(req.user.companyId, {
      include: [
        {
          model: Plans,
          include: [
            {
              model: BasePlans,
            },
          ],
        },
      ],
    });
    if (!company)
      return res.status(404).json({ message: "Something went wrong" });

    const planMonthlySDSSearchCount =
      company.Plan.customMonthlySDSSearchCount ||
      company.Plan.BasePlan.monthlySDSSearchCount;
    if (company.monthlySDSSearchUsage >= planMonthlySDSSearchCount)
      return res.status(400).json({
        message: `You can only have ${planMonthlySDSSearchCount} SDS searches in this month on this plan`,
      });

    await Companies.update(
      {
        monthlySDSSearchUsage: company.monthlySDSSearchUsage * 1 + 1,
      },
      {
        where: {
          id: req.user.companyId,
        },
      }
    );

    const response = await axios.post(PROXY_BASE_URL + "/search", requestData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Field to fetch",
      error: error.response?.data || "Server error",
    });
  }
};

const saveSDS = async (req, res) => {
  const {
    doc_id,
    product_name,
    product_code,
    mfg_detail,
    issue_date,
    country,
    lang,
  } = req.body;
  const { projectId } = req.query;
  if (!doc_id)
    return res.status(400).json({ message: "Document id is required" });
  if (!projectId)
    return res.status(400).json({ message: "Project id is required" });

  try {
    const company = await Companies.findByPk(req.user.companyId, {
      include: [
        {
          model: Plans,
          include: [
            {
              model: BasePlans,
            },
          ],
        },
      ],
    });
    if (!company)
      return res.status(404).json({ message: "Something went wrong" });

    const planMonthlySDSSaveCount =
      company.Plan.customMonthlySDSSaveCount ||
      company.Plan.BasePlan.monthlySDSSaveCount;
    if (company.monthlySDSSaveUsage >= planMonthlySDSSaveCount)
      return res.status(400).json({
        message: `You can only save ${planMonthlySDSSaveCount} SDS files in this month on this plan`,
      });

    await Companies.update(
      {
        monthlySDSSaveUsage: company.monthlySDSSaveUsage * 1 + 1,
      },
      {
        where: {
          id: req.user.companyId,
        },
      }
    );

    const allSameSDS = await SDS.findAll({
      where: {
        product_name,
        product_code,
        mfg_detail: JSON.stringify(mfg_detail),
        issue_date,
        country,
        lang,
      },
    });

    const existsSDS = allSameSDS ? allSameSDS[0] : null;

    let fileName = `${Date.now()}.pdf`;

    if (!existsSDS) {
      const response = await axios.post(
        PROXY_BASE_URL + "/get",
        { doc_id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const base64Data = response.data;
      const buffer = Buffer.from(base64Data, "base64");
      const filePath = path.join(__dirname, "../sds-files", fileName);
      fs.writeFileSync(filePath, buffer);
    } else {
      if (allSameSDS.some((sds) => sds.CompanyId == req.user.companyId)) {
        return res.status(200).json(existsSDS);
      }
      fileName = existsSDS.fileName;
    }

    await SDS.create({
      product_name,
      product_code,
      mfg_detail: JSON.stringify(mfg_detail),
      issue_date,
      country,
      lang,
      fileName,
      ProjectId: projectId,
    });

    res.status(200).json({ message: "SDS saved successfully" });
  } catch (error) {
    console.log(error.message);

    res.status(500).json({
      message: "Field to fetch",
      error: error.response?.data || "Server error",
    });
  }
};

module.exports = { searchSDS, getSDS, saveSDS };
